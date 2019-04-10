import { GET_USERS } from "../actions/users";
import { SAVE_QUESTION_ANSWER, SAVE_QUESTION } from "../actions/questions";

export default function users(state = {}, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    case SAVE_QUESTION_ANSWER:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.qid]: action.answer
          }
        }
      };
    case SAVE_QUESTION:
      return {
        ...state,
        [action.question.author]: {
          ...state[action.question.author],
          questions: [
            ...state[action.question.author].questions,
            action.question.id
          ]
        }
      };
    default:
      return state;
  }
}
