function wrapResponseBody(body) {
  return {
    status: 'ok',
    ...body,
  }
}

module.exports = {
  wrapResponseBody,
};
