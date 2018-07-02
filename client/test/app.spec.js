describe('app.spec.js', () => {
    beforeEach(module('demoApp'));

    var controller, scope, http, q;
    var mockData = { data: "mock data" };

    beforeEach(inject(function ($controller, $rootScope, $httpBackend, $q) {
        scope = $rootScope.$new();
        controller = $controller('myController', { $scope: scope });
        q = $q;

        http = $httpBackend;
        http.whenGET('/api').respond(mockData);
        http.whenGET('/api2').respond(mockData);
    }));

    it("should init correctly", () => {
        expect(scope.greetings).toEqual('hello world!');
        expect(controller.hello).toEqual('hello');
    });

    it("should update greetings after query", (done) => {
        scope.query().then(() => {
            expect(scope.greetings).toEqual(mockData.data);
            done();
        });
        http.flush();
    });

    describe("async query tests", () => {
        beforeEach(() => {
            controller.queryAlot = async () => {
                controller.hello = mockData.data;
                return await 1;
                // return Promise.resolve(1);
                // return q.when(1);
            };
        });

        it("should update greetings after query2", (done) => {
            scope.query2();
            setTimeout(() => {
                expect(controller.hello).toEqual(mockData.data);
                done();
            }, 3000);
        });

        it("should update greetings after query3", (done) => {
            scope.query3().then(() => {
                expect(controller.hello).toEqual(mockData.data);
                expect(scope.greetings).toEqual("3 done");
                done();
            });
        });
    });


    function resolveAfter2Seconds(x) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(x);
            }, 2000);
        });
    }

    async function add1(x) {
        var a = resolveAfter2Seconds(20);
        var b = resolveAfter2Seconds(30);
        return x + await a + await b;
    }
    it('tests that async / await works', async () => {
        var v = await add1(10);
        expect(v).toBe(60);
    });

    it('tests that done works', (done) => {
        add1(10).then(v => {
            expect(v).toBe(60);
            done();
        })
    });
});