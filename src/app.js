/**
 * Функция для подсчета общего количества баллов по успеваемости студентов.
 * @param {Object} scores - Объект с баллами студентов.
 * @returns {number} - Сумма всех баллов.
 */

function getScore(scores) {
  let totalScore = 0;
  for (let key in scores) {
    totalScore += scores[key];
  }
  return totalScore;
}

console.log(getScore({
  Anna: 10,
  Olga: 1,
  Ivan: 5,
  })) //16
