const { Users, Profile, Photos, Comments} = require('../models')

const main = async() => {
    await Users.destroy({
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

    const user1 = await Users.create({
        userName:'',
        email:'',
        token:''
    });

    const user2 = await Users.create({
        userName:'',
        email:'',
        token:''
    });


    const photo1 = await Photos.create({
       images:'',
       description:'',
       street:'',
       croosStreet:'',
       filter:''
    });

    const photo2 = await Photos.create({
        images:'',
        description:'',
        street:'',
        croosStreet:'',
        filter:''
     });

     const photo3 = await Photos.create({
        images:'',
        description:'',
        street:'',
        croosStreet:'',
        filter:''
     });

     const photo4 = await Photos.create({
        images:'',
        description:'',
        street:'',
        croosStreet:'',
        filter:''
     });

     const photo5 = await Photos.create({
        images:'',
        description:'',
        street:'',
        croosStreet:'',
        filter:''
     });

}