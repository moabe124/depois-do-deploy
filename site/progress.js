import {firebaseConfig} from './firebase-config.js';
import {nextQuiz,quizText} from './progress-model.js';
const panels=[...document.querySelectorAll('[data-progress-panel]')];
const account=document.getElementById('account'),status=document.getElementById('sync-status');
let user=null,records=new Map(),loaded=false,unsubscribe=null,epoch=0,sdk=null;
const pending=new Set();
function notice(text){if(status)status.textContent=text;}
function render(){
  for(const panel of panels){
    const id=panel.dataset.lessonId, record=records.get(id),toggle=panel.querySelector('[data-read-toggle]'),label=panel.querySelector('[data-read-label]'),quiz=panel.querySelector('[data-quiz-label]');
    const signed=!!user,ready=signed&&loaded,isRead=ready&&record?.read===true;
    label.textContent=signed?(loaded?(isRead?'Lido':'Não lido'):'Carregando progresso…'):'Entre para acompanhar sua leitura';
    label.classList.toggle('is-read',isRead);toggle.disabled=!ready||pending.has(id);toggle.textContent=isRead?'Marcar como não lido':'Marcar como lido';toggle.setAttribute('aria-pressed',String(isRead));
    const definition=JSON.parse(panel.dataset.quiz||'null');
    quiz.textContent=signed&&loaded?quizText(record?.quiz,definition):'Resultados privados da sua conta';
    if(panel.dataset.article==='true')document.querySelectorAll('[data-question-id] [data-answer]').forEach(button=>button.disabled=(signed&&!loaded)||pending.has(id));
    if(panel.dataset.article==='true'&&ready&&!pending.has(id)){
      const saved=record?.quiz?.version===definition?.version?record.quiz:null;
      document.querySelectorAll('[data-question-id]').forEach(question=>question.querySelectorAll('[data-answer]').forEach(button=>button.setAttribute('aria-pressed',String(saved?.answers?.[question.dataset.questionId]===button.dataset.answer))));
    }
  }
  if(account){account.disabled=!sdk;account.textContent=user?'Sair da conta':'Entrar com Google';account.setAttribute('aria-label',user?'Sair da conta de '+(user.displayName||'leitor'):'Entrar com Google');}
}
function errorMessage(error){
  if(error.code==='auth/popup-closed-by-user')return 'Login cancelado. A leitura continua disponível.';
  if(error.code==='auth/popup-blocked')return 'O navegador bloqueou a janela. Permita pop-ups deste site e tente novamente.';
  if(error.code==='permission-denied')return 'Não foi possível acessar seu progresso. Tente entrar novamente.';
  if(error.code==='auth/unauthorized-domain')return 'Este endereço ainda não está autorizado para login.';
  return 'Não foi possível sincronizar. Verifique sua conexão e tente novamente.';
}
async function write(id,transform){
  if(!user||!loaded){notice('Entre com Google para salvar seu progresso.');return false;}
  if(pending.has(id))return false;
  const uid=user.uid,started=epoch;pending.add(id);render();notice('Salvando progresso…');
  try{
    await sdk.runTransaction(sdk.db,async transaction=>{
      const ref=sdk.doc(sdk.db,'depoisDoDeploy',uid,'lessons',id),snapshot=await transaction.get(ref);
      const current=snapshot.exists()?snapshot.data():{read:false,readAt:null,quiz:null};
      const next=transform(current);transaction.set(ref,{...next,updatedAt:sdk.serverTimestamp()});
    });
    if(started===epoch)notice('Progresso salvo na sua conta.');return true;
  }catch(error){if(started===epoch)notice(errorMessage(error));return false;}
  finally{if(started===epoch)pending.delete(id);render();}
}
for(const panel of panels){
  panel.querySelector('[data-read-toggle]').addEventListener('click',()=>{const id=panel.dataset.lessonId,target=records.get(id)?.read!==true;write(id,current=>({...current,read:target,readAt:target?sdk.serverTimestamp():null}));});
  if(panel.dataset.article==='true'){
    const definition=JSON.parse(panel.dataset.quiz||'null');
    document.querySelectorAll('[data-question-id]').forEach(question=>question.querySelectorAll('[data-answer]').forEach(button=>button.addEventListener('click',()=>{
      if(!user){notice('Resposta exibida. Entre com Google para guardar o resultado.');return;}
      write(panel.dataset.lessonId,current=>({...current,quiz:nextQuiz(current.quiz,definition,question.dataset.questionId,button.dataset.answer)}));
    })));
  }
}
account?.addEventListener('click',async()=>{if(!sdk)return;account.disabled=true;try{if(user)await sdk.signOut(sdk.auth);else await sdk.signInWithPopup(sdk.auth,new sdk.GoogleAuthProvider());}catch(error){notice(errorMessage(error));}finally{render();}});
render();
try{
  const [app,auth,firestore]=await Promise.all([
    import('https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js'),
    import('https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js'),
    import('https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js')
  ]);
  const instance=app.initializeApp(firebaseConfig,'depois-do-deploy');
  sdk={...auth,...firestore,auth:auth.getAuth(instance),db:firestore.getFirestore(instance)};
  auth.onAuthStateChanged(sdk.auth,next=>{
    epoch++;unsubscribe?.();unsubscribe=null;user=next;records=new Map();loaded=false;pending.clear();render();
    document.querySelectorAll('[data-question-id] [data-answer]').forEach(button=>button.setAttribute('aria-pressed','false'));
    const feedback=document.getElementById('feedback');if(feedback){feedback.hidden=true;feedback.textContent='';}
    if(!next){notice('Entre com Google para sincronizar leituras e resultados entre seus dispositivos.');return;}
    notice('Carregando seu progresso…');const currentEpoch=epoch;
    unsubscribe=firestore.onSnapshot(firestore.collection(sdk.db,'depoisDoDeploy',next.uid,'lessons'),snapshot=>{
      if(currentEpoch!==epoch)return;records=new Map(snapshot.docs.map(doc=>[doc.id,doc.data()]));loaded=true;render();notice('Progresso sincronizado · '+(next.displayName||'sua conta'));
    },error=>{if(currentEpoch!==epoch)return;loaded=false;records.clear();render();notice(errorMessage(error));});
  },error=>notice(errorMessage(error)));
  render();
}catch(error){notice('A sincronização não carregou. Você pode continuar lendo e tentar novamente mais tarde.');}
