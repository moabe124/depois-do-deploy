import test from 'node:test';
import assert from 'node:assert/strict';
import {nextQuiz,quizText} from '../site/progress-model.js';
const quiz={version:'1',questions:[{id:'q1',options:['a','b'],correct:'b'},{id:'q2',options:['c','d'],correct:'d'}]};
test('accumulates answers and recomputes the latest result',()=>{
 let state=nextQuiz(null,quiz,'q1','a');assert.equal(state.score,0);assert.match(quizText(state,quiz),/incompleto/);
 state=nextQuiz(state,quiz,'q2','d');assert.equal(state.score,1);assert.equal(state.attempts,2);
 state=nextQuiz(state,quiz,'q1','b');assert.equal(state.score,2);assert.equal(state.attempts,3);assert.equal(state.answers.q2,'d');
});
test('a new quiz version does not grade obsolete answers',()=>{
 const old={version:'old',answers:{q1:'b'},attempts:99};
 assert.match(quizText(old,quiz),/atualizado/);
 const next=nextQuiz(old,quiz,'q2','d');assert.equal(next.attempts,1);assert.equal(next.answers.q1,undefined);
});
test('rejects unknown questions and options',()=>{
 assert.throws(()=>nextQuiz(null,quiz,'unknown','b'));
 assert.throws(()=>nextQuiz(null,quiz,'q1','unknown'));
});
