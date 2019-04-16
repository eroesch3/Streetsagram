const { Users, Profiles, Photos, Comments } = require('../models')

const main = async () => {

    // delete database

    await Users.destroy({
        where: {}
    });

    await Photos.destroy({
        where: {}
    });

    await Comments.destroy({
        where: {}
    });

    // Add seed here - users

    const user1 = await Users.create({
        username: 'ComTruise',
        email: 'a@a.com',
        token: ''
    });

    const user2 = await Users.create({
        username: 'bubbagurl',
        email: 'b@b.com',
        token: ''
    });

    // Add seed here - photos

    const photo1 = await Photos.create({
        image: 'https://i.imgur.com/GRDJgn3.jpg',
        description: 'Graffiti2',
        street: 'lafayette st.',
        cross_street: 'broadway ',
        filter: ''
    });

    const photo2 = await Photos.create({
        image: 'https://i.imgur.com/qbpqmYw.jpg',
        description: 'Tun tun tunnel',
        street: 'Bedford St.',
        croos_street: 'N7',
        filter: ''
    });

    const photo3 = await Photos.create({
        image: 'https://i.imgur.com/Ea6MQ9p.jpg',
        description: 'Mad City',
        street: '7th Ave.',
        cross_street: '36th St.',
        filter: ''
    });

    const photo4 = await Photos.create({
        image: 'https://i.imgur.com/JhngWan.jpg',
        description: 'Doin ma thang',
        street: 'Northen Blvd.',
        cross_street: '43th St.',
        filter: ''
    });

    const photo5 = await Photos.create({
        image: 'https://i.imgur.com/kgiwdpj.jpg',
        description: 'Doing ya thang',
        street: 'Southern Blvd.',
        cross_street: '87th st.',
        filter: ''
    });

    //  Associations

    await photo1.setUser(user1);
    await photo2.setUser(user1);
    await photo3.setUser(user1);
    await photo4.setUser(user2);
    await photo5.setUser(user2);


    process.exit()
}

main();