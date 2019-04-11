const { User, Profile, Photos, Comments} = require('../models')

const main = async() => {

    // delete databse

    await User.destroy({
        where:{}
    });

    await Profile.destroy({
        where:{}
    });
    await Photos.destroy({
        where:{}
    });
    await Commnents.destroy({
        where:{}
    });

    // Add seed here - users

    const user1 = await User.create({
        userName:'Com Truise',
        email:'liltomtom@gail.com',
        token:''
    });

    const user2 = await User.create({
        userName:'Larry Johnson',
        email:'basket@gmial.com',
        token:''
    });

    // Add seed here - photos

    const photo1 = await Photos.create({
       images:'',
       description:'La misma pelota',
       street:'lafayette st.',
       croosStreet:'broadway ',
       filter:''
    });

    const photo2 = await Photos.create({
        images:'',
        description:'Nice shoots nice shorts',
        street:'Bedford St.',
        croosStreet:'N7',
        filter:''
     });

     const photo3 = await Photos.create({
        images:'',
        description:'Shaking Shaking',
        street:'7th Ave.',
        croosStreet:'36th St.',
        filter:''
     });

     const photo4 = await Photos.create({
        images:'',
        description:'Doin ma thang',
        street:'Northen Blvd.',
        croosStreet:'43th St.',
        filter:''
     });

     const photo5 = await Photos.create({
        images:'Doin ya thang',
        description:'Southern Blvd.',
        street:'87th st.',
        croosStreet:'',
        filter:''
     });

    //  Assiations

    await photo1.setUser(user1);
    await photo2.setUser(user1);
    await photo3.setUser(user1);
    await photo4.setUser(user2);
    await photo5.setUser(user2);
   


}