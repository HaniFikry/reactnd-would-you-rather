import {
  _getQuestions,
  _saveQuestionAnswer,
  _saveQuestion
} from "../utils/_DATA";
import { showLoading, hideLoading } from 'react-redux-loading'

export const GET_QUESTIONS = "GET_QUESTIONS";
export const SAVE_QUESTION_ANSWER = "SAVE_QUESTION_ANSWER";
export const SAVE_QUESTION = "SAVE_QUESTION";

function getQuestions(questions) {
  return {
    type: GET_QUESTIONS,
    questions
  };
}

function saveQuestion(question) {
  return {
    type: SAVE_QUESTION,
    question
  };
}

function saveQuestionAnswer({ authedUser, qid, answer }) {
  return {
    type: SAVE_QUESTION_ANSWER,
    authedUser,
    qid,
    answer
  };
}

export function handleGetQuestions() {
  return dispatch => {
    dispatch(showLoading())
    return _getQuestions().then(resp => {
      dispatch(getQuestions(resp));
      dispatch(hideLoading())
    });
  };
}

export function handleSaveQuestion(question) {
  return dispatch => {
    dispatch(showLoading())
    return _saveQuestion(question).then(resp => {
      dispatch(saveQuestion(resp));
      dispatch(hideLoading())
    });
  };
}

export function handleSaveQuestionAnswer(userAnswer) {
  return dispatch => {
    dispatch(showLoading())
    return _saveQuestionAnswer(userAnswer).then(resp => {
      dispatch(saveQuestionAnswer(userAnswer));
      dispatch(hideLoading())
    });
  };
}
