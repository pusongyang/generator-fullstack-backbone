define(['chai','collections/doctors'], function(chai,DoctorsCollection) {
    var expect = chai.expect;
    describe("DoctorsCollection", function () {
        before(function () {
            this.Doctors = new DoctorsCollection();
        });
        after(function () {
            // Remove the reference.
            this.Doctors = null;
        });
        describe("creation", function () {
            it("has default values", function () {
                var Doctors = this.Doctors;
                expect(Doctors.length).to.equal(0);
            });
            // -- Omitted in Book. --
            it("expect be 5 doctors on fetch", function (done) {
                var Doctors = this.Doctors;
                // Stash reference to save context.
                // Before fetch.
                expect(Doctors.length).to.equal(0);
                // After fetch.
                Doctors.once("reset", function () {
                    expect(Doctors.length).to.equal(5);
                    Doctors.reset();
                    done();
                });
                Doctors.fetch({ reset: true });
            });
        });

        describe("modification", function () {
            beforeEach(function () {
                this.Doctors.create({
                    _id:1,
                    name: 'Doctor Test',
                    email: 'test@turingcat.com'
                });
            });
            afterEach(function () {
                // Wipe internal data and reset collection.
                this.Doctors.reset();
            });
            it("has a single Doctor", function () {
                var Doctors = this.Doctors, Doctor;
                expect(Doctors.length).to.equal(1);
                // Check model attributes.
                Doctor = Doctors.at(0);
                expect(Doctor.get("name")).to.contain("Doctor Test");
                expect(Doctor.get("email")).to.contain("test@turingcat.com");
            });
            it("can delete a Doctor", function (done) {
                var Doctors = this.Doctors, Doctor;
                // After shift.
                Doctors.once("remove", function () {
                    expect(Doctors.length).to.equal(0);
                    done();
                });
                // Remove and return first model.
                Doctor = Doctors.shift();
            });
            it("can create a second Doctor", function () {
                var Doctors = this.Doctors,
                    Doctor = this.Doctors.create({
                        _id:2,
                        name: 'Doctor2 Test',
                        email: 'test2@turingcat.com'
                    });
                expect(Doctors).to.have.length(2);
                // Check model attributes.
                Doctor = Doctors.at(1);
                expect(Doctor.get("name")).to.contain("Doctor2 Test");
                expect(Doctor.get("email")).to.contain("test2@turingcat.com");
            });

        });
    });

});