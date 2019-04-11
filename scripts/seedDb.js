const { Users, Profiles, Photos, Comments} = require('../models')

const main = async() => {

    // delete databse

    await Users.destroy({
        where:{}
    });

    await Profiles.destroy({
        where:{}
    });
    await Photos.destroy({
        where:{}
    });
    await Commnents.destroy({
        where:{}
    });

    // Add seed here - users

    const user1 = await Users.create({
        userName:'ComTruise',
        email:'a@a',
        token:''
    });

    const user2 = await Users.create({
        userName:'bubbagurl',
        email:'b@b',
        token:''
    });

    // Add seed here - photos

    const photo1 = await Photos.create({
       image:'https://imgur.com/laB0X2v',
       description:'Graffiti2',
       street:'lafayette st.',
       cross_street:'broadway ',
       filter:''
    });

    const photo2 = await Photos.create({
        image:'https://imgur.com/rKnzY5O',
        description:'Tun tun tunnel',
        street:'Bedford St.',
        croos_street:'N7',
        filter:''
     });

     const photo3 = await Photos.create({
        image:'https://imgur.com/adQW7nt',
        description:'Mad City',
        street:'7th Ave.',
        cross_street:'36th St.',
        filter:''
     });

     const photo4 = await Photos.create({
        image:'https://imgur.com/SIwSh1f',
        description:'Doin ma thang',
        street:'Northen Blvd.',
        cross_street:'43th St.',
        filter:''
     });

     const photo5 = await Photos.create({
        image:'https://imgur.com/jW9MrzQ',
        description:'Doing ya thang',
        street:'Southern Blvd.',
        cross_street:'87th st.',
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