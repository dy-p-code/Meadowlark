// 홈페이지가 렌더링 되고 있는지에 대한 테스트코드

const handler = require('../handler.js');
// 테스트할 코드인 라우터 핸들러를 임포트해서 가져옴

test('home page render', () => {
  const req = {};
  // 요청(req) 객체를 테스트할 필요가 없으므로 빈 객체
  const res = { render: jest.fn() };
  // 웅답(res) 객체에서 필요한 부분은 렌더링 메서드
  // 렌더링 함수는 제스트 메서드 (jest.fn())을 호출하면 만들어짐
  handler.home(req, res);
  // 문자열 home을 가지고 응답 객체의 render 메서드를 호출하는 일
  expect(res.render.mock.calls.length).toBe(1);
  // 제스트 모형 함수는 자신이 호출되었을 때를 항상 추적하므로
  // 함수가 1회 호출되었는지만 확인하면 되며 2회 호출된 것은 문제가 있는 것
  expect(res.render.mock.calls[0][0]).toBe('home');
  // 첫번째 [0] 첫번째로 호출된 상황이며
  // 두번째 [0] 그 상황에서 전달받은 매개변수 중 첫번째
  // 따라서 이 매개변수는 home 이어야 함
});

test('about page render with fortune', () => {
  const req = {};
  const res = { render: jest.fn() };
  handler.about(req, res);
  expect(res.render.mock.calls.length).toBe(1);
  expect(res.render.mock.calls[0][0]).toBe('about');
  expect(res.render.mock.calls[0][1]).toEqual(
    expect.objectContaining({
      fortune: expect.stringMatching(/\W/),
    })
  );
});

test('404 handler render', () => {
  const req = {};
  const res = { render: jest.fn() };
  handler.notFound(req, res);
  expect(res.render.mock.calls.length).toBe(1);
  expect(res.render.mock.calls[0][0]).toBe('404');
});

test('500 handler render', () => {
  const err = new Error('some error');
  const req = {};
  const res = { render: jest.fn() };
  const next = jest.fn();
  handler.serverError(err, req, res, next);
  expect(res.render.mock.calls.length).toBe(1);
  expect(res.render.mock.calls[0][0]).toBe('500');
});
