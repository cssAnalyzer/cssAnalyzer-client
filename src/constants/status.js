const CODES = {
  OK: 200,
  CREATED: 201,
  INVALID_REQ: 400,
  INTERNAL_SERVER_ERR: 500,
}

const ERROR_MSG = {
  INVALID_REQ: "유효하지 않은 요청입니다.",
  INTERNAL_SERVER_ERR: "무언가 잘못되었어요!",
}

const STATUS = { CODES, ERROR_MSG }

export default STATUS;
