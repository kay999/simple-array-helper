const expect = require('expect.js');
const A = require('../index');

describe('check array', function() {
	it('should work', function() {
		expect(A.is([])).to.be(true);
		expect(A.is([1, 2])).to.be(true);

		expect(A.is({})).to.be(false);
		expect(A.is('string')).to.be(false);
		expect(A.is(100)).to.be(false);
		expect(A.is()).to.be(false);
		expect(A.is(null)).to.be(false);
	});
});

describe('mk/from', function() {
	it('should work', function() {
		expect(A.mk(null)).to.eql([]);
		expect(A.mk()).to.eql([]);
		expect(A.mk(1)).to.eql([1]);
		expect(A.mk([1, 2, 3])).to.eql([1, 2, 3]);
	});
});

describe('intersperse', function() {
	it('should work', function() {
		expect(A.intersperse('x', null)).to.eql([]);
		expect(A.intersperse('x', [])).to.eql([]);
		expect(A.intersperse('x', [1])).to.eql([1]);
		expect(A.intersperse('x', [1, 2, 3])).to.eql([1, 'x', 2, 'x', 3]);
	});
});

describe('append', function() {
	it('should work', function() {
		const data = {};
		expect(data).to.eql({});

		A.append(data, 'vals', 1);
		expect(data).to.eql({ vals:[1] });

		A.append(data, 'vals', 2);
		expect(data).to.eql({ vals:[1, 2] });

		A.appendUnique(data, 'vals', 3);
		expect(data).to.eql({ vals:[1, 2, 3] });

		A.appendUnique(data, 'vals', 1);
		expect(data).to.eql({ vals:[1, 2, 3] });

		A.append(data, 'vals', 2);
		expect(data).to.eql({ vals:[1, 2, 3, 2] });
	});
});

describe('prepend', function() {
	it('should work', function() {
		const data = {};
		expect(data).to.eql({});

		A.prepend(data, 'vals', 1);
		expect(data).to.eql({ vals:[1] });

		A.prepend(data, 'vals', 2);
		expect(data).to.eql({ vals:[2, 1] });
	});
});

describe('remove', function() {
	it('should work', function() {
		const data = {};
		A.append(data, 'val1', 1);
		A.append(data, 'val1', 2);
		A.append(data, 'val2', 3);
		A.append(data, 'val2', 4);

		expect(data).to.eql({ val1:[1, 2], val2:[3, 4] });

		expect(A.remove(data, 'val1', 0)).to.be(false);
		expect(A.remove(data, 'val1', 1)).to.be(true);

		expect(data['val1']).to.eql([2]);

		expect(A.remove(data, 'val1', 1)).to.be(false);
		expect(A.remove(data, 'val1', 2)).to.be(true);

		expect(data['val1']).to.eql(undefined);
		expect(data).to.eql({ val2:[3, 4] });
	});
});

describe('buildIndex', function() {
	const data = [{ val:10 }, { val:20 }, { val:20 }];

	it('should work', function() {
		const index1 = A.buildIndex(data, 'val');
		expect(index1).to.eql({
			'10': [ { val: 10 } ],
			'20': [ { val: 20 }, { val: 20 } ]
		});
	});

	it('should work for unique-index', function() {
		const index1 = A.buildIndexUnique(data, 'val');
		expect(index1).to.eql({
			'10': { val: 10 },
			'20': { val: 20 }
		});
	});
});

describe('fromString', function() {
	it('should work', function() {
		expect(A.fromString('')).to.eql([]);
		expect(A.fromString('1')).to.eql(['1']);
		expect(A.fromString('1, 2, 3')).to.eql(['1', '2', '3']);
		expect(A.fromString(' 1,    2   ,  3 ')).to.eql([' 1', '2', '3 ']);
	});
});

describe('push', function() {
	it('unique should work', function() {
		const arr = [2];
		A.pushUnique(arr, 1);
		A.pushUnique(arr, 2);
		A.pushUnique(arr, 3);
		A.pushUnique(arr, 3);
		expect(arr).eql([2, 1, 3]);
	});

	it('uniqueAll should work', function() {
		const arr = [2];
		A.pushAllUnique(arr, [1, 2, 3, 3]);
		A.pushAllUnique(arr, [1, 2, 3]);
		A.pushAllUnique(arr, null);
		expect(arr).eql([2, 1, 3]);
	});

	it('pushAll should work', function() {
		const arr = [2];
		A.pushAll(arr, [1, 2, 3, 3]);
		A.pushAll(arr, []);
		A.pushAll(arr, null);
		expect(arr).eql([2, 1, 2, 3, 3]);
	});
});

describe('ensure', function() {
	it('ensure should work', function() {
		const v = { b:{ v:10 } };

		A.ensure(v, 'a').x = 10;
		expect(v).eql({ b:{v:10}, a: { x: 10 }});
		
		A.ensure(v, 'b').x = 11;
		expect(v).eql({ b:{v:10, x: 11}, a: { x: 10 }});

		delete A.ensure(v, 'a').x;
		expect(v).eql({ b:{v:10, x: 11}, a: { }});
	});
});

describe('pairs', function() {
	it('pairs should work', function() {
		const v = [1, 2, 3];

		expect(A.pairs(null)).eql([]);
		expect(A.pairs(undefined)).eql([]);
		expect(A.pairs(v)).eql([[1, 2], [2, 3]]);
		expect(A.pairsWrap(v)).eql([[1, 2], [2, 3], [3, 1]]);

		const e = [];
		expect(A.pairs(e)).eql([]);
	});
});

describe('nullForEmpty', function() {
	it('nullForEmpty should work', function() {
		expect(A.nullForEmpty(null)).eql(null);
		expect(A.nullForEmpty([])).eql(null);
		expect(A.nullForEmpty([1])).eql([1]);
	});
});

describe('first', function() {
	it('first should work', function() {
		expect(A.first(null)).eql(undefined);
		expect(A.first()).eql(undefined);
		expect(A.first([])).eql(undefined);
		expect(A.first([1])).eql(1);
		expect(A.first([1, 3, 4])).eql(1);
	});
});

describe('last', function() {
	it('last should work', function() {
		expect(A.last(null)).eql(undefined);
		expect(A.last([])).eql(undefined);
		expect(A.last([1])).eql(1);
		expect(A.last([1, 3, 4])).eql(4);
	});
});

