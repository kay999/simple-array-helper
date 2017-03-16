const expect = require('expect.js');
const A = require('../index');

describe('intersperse', function() {
	it('should work', function() {
		expect(A.intersperse('x', [])).to.eql([]);
		expect(A.intersperse('x', [1])).to.eql([1]);
		expect(A.intersperse('x', [1, 2, 3])).to.eql([1, 'x', 2, 'x', 3]);
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

