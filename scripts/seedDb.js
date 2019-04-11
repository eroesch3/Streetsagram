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
        userName:'ComTruise',
        email:'a@a',
        token:''
    });

    const user2 = await User.create({
        userName:'bubbagurl',
        email:'b@b',
        token:''
    });

    // Add seed here - photos

    const photo1 = await Photos.create({
       images:'https://imgur.com/laB0X2v',
       description:'Graffiti2',
       street:'lafayette st.',
       croosStreet:'broadway ',
       filter:''
    });

    const photo2 = await Photos.create({
        images:'https://imgur.com/rKnzY5O',
        description:'Tun tun tunnel',
        street:'Bedford St.',
        croosStreet:'N7',
        filter:''
     });

     const photo3 = await Photos.create({
        images:'https://imgur.com/adQW7nt',
        description:'Mad City',
        street:'7th Ave.',
        croosStreet:'36th St.',
        filter:''
     });

     const photo4 = await Photos.create({
        images:'https://imgur.com/SIwSh1f',
        description:'Doin ma thang',
        street:'Northen Blvd.',
        croosStreet:'43th St.',
        filter:''
     });

     const photo5 = await Photos.create({
        images:'https://imgur.com/jW9MrzQ',
        description:'Doing ya thang',
        street:'Southern Blvd.',
        croosStreet:'87th st.',
        filter:''
     });

    //  Assiations

    await photo1.setUser(user1);
    await photo2.setUser(user1);
    await photo3.setUser(user1);
    await photo4.setUser(user2);
    await photo5.setUser(user2);
   

    Process.exit()
}