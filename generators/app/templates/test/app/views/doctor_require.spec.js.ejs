define(['chai','collections/doctors','views/doctor'], function(chai,DoctorsCollection,DoctorView) {
    var expect = chai.expect;
    describe("DoctorView template rendering", function () {
        it('render by remote data', function (done) {
            var view = new DoctorView();
            view.once('render', function () {
                expect(view.$el.html()).to.have.string('Your content here.');
                done();
            })
        });
        it('render by collection instance', function () {
            var Doctors = new DoctorsCollection();
            Doctors.create({
                '_id': 1,
                'email': 'test@turingcat.com',
                'name': 'Doctor Test',
                'image': 'http://'
            });
            var view = new DoctorView(Doctors);
            view.render();
            expect(view.$el.html()).to.have.string('test@turingcat.com');
            expect(view.$el.html()).to.have.string('Doctor Test');
        });
    });
});