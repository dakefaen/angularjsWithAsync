describe('app.spec.js', () => {
    beforeEach(module('demoApp'));

    var controller, scope, http;
    var mockData = { data: "mock data" };

    beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
        scope = $rootScope.$new();
        controller = $controller('myController', { $scope: scope });

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
            controller.queryAlot = () => {
                controller.hello = mockData.data;
                return Promise.resolve(1);
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



});