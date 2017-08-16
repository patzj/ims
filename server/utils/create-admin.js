import User from '../models/user';

export const createAdmin = () => {
    const query = User.findOne({username: 'admin'});
    const promise = query.exec();

    promise.then(doc => {
        if(doc) {
            console.log('Admin account already exists');
        } else {
            const admin = new User({
                username: 'admin',
                password: User.generateHash('admin'),
                name: 'Admin',
                role: 'SYSTEM ADMIN'
            });

            admin.save().then(() => {
                console.log('Admin account successfully created');
            }).catch(() => {
                console.log('Admin account creation failed');
            });
        }
    }).catch(err => {
        console.log('Something went wrong');
    });
};

export default createAdmin;
