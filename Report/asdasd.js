res = "{a: 1, b:2, c: 3}"

b = 2;

let resbody = JSON.parse(res)

expect(2).to.be(resbody.b)

