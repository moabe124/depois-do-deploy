export function nextQuiz(previous, definition, questionId, choice) {
  const question=definition.questions.find(q=>q.id===questionId);
  if(!question || !question.options.includes(choice))throw Error('Resposta inválida.');
  const valid=previous?.version===definition.version;
  const answers={...(valid?previous.answers:{}),[questionId]:choice};
  const score=definition.questions.filter(q=>answers[q.id]===q.correct).length;
  return {version:definition.version,answers,score,total:definition.questions.length,attempts:(valid?previous.attempts:0)+1};
}
export function quizText(quiz, definition) {
  if(!definition)return 'Sem questionário nesta edição';
  if(!quiz)return 'Questionário ainda não respondido';
  if(quiz.version!==definition.version)return 'Questionário atualizado · responda novamente';
  const answered=definition.questions.filter(q=>quiz.answers?.[q.id]).length;
  const score=definition.questions.filter(q=>quiz.answers?.[q.id]===q.correct).length;
  return `Última tentativa: ${score}/${definition.questions.length} ${score===1?'acerto':'acertos'} · ${quiz.attempts} ${quiz.attempts===1?'resposta':'respostas'}${answered<definition.questions.length?' · incompleto':''}`;
}
