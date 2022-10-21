'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: "https://w6h9m9r2.rocketcdn.me/wp-content/uploads/2022/06/Mansions-in-Southern-California-Jay-Valento.webp",
        preview: true
      },
      {
        spotId: 2,
        url: "https://a57.foxnews.com/static.foxbusiness.com/foxbusiness.com/content/uploads/2022/02/0/0/Screen-Shot-2022-02-08-at-1.01.01-PM-gigapixel-low_res-scale-2_00x.png?ve=1&tl=1",
        preview: true
      },
      {
        spotId: 3,
        url: "https://www.gannett-cdn.com/presto/2021/01/11/NPBD/2732f93f-e683-41da-8a77-35e11c50bb8c-PBN_535_N_County_Rd_Pool_SmRes.jpg?crop=1315,740,x0,y0&width=660&height=372&format=pjpg&auto=webp",

        preview: true
      },
      {
        spotId: 4,
        url: "https://static.onecms.io/wp-content/uploads/sites/34/2021/05/17/the-breakers-mansion-alt-getty-0521-2000.jpg",
        preview: true
      },
      {
        spotId: 5,
        url: "https://giggster.com/blog/content/images/size/w960/2020/11/10-Stunning-Mansions-To-Rent-For-Film-and-Photo-in-New-York.jpeg",

        preview: true
      },
      {
        spotId: 6,
        url: "https://www.oregonlive.com/resizer/o9TLlhu3qCWIyDyAu2gbwYp7Iyk=/1280x0/smart/advancelocal-adapter-image-uploads.s3.amazonaws.com/expo.advance.net/img/2aeac68ccb/width2048/260_2928sewoodstockblvd2032407923.jpeg",
        preview: true
      },
      {
        spotId: 7,
        url: "https://i.pinimg.com/originals/c0/e5/57/c0e5577d43e7d76ca8eb6ad17be092e9.jpg",

        preview: true
      },
      {
        spotId: 8,
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Gelbensande3.jpg/1200px-Gelbensande3.jpg",
        preview: true
      },
      {
        spotId: 9,
        url: "https://i.ytimg.com/vi/MARPpXuTi7k/maxresdefault.jpg",

        preview: true
      },
      {
        spotId: 10,
        url: "https://i.pinimg.com/originals/8f/c6/f7/8fc6f7319a45f87aeb4fbc9be96b9ff7.jpg",
        preview: true
      },
      {
        spotId: 11,
        url: "https://cdn.cheapism.com/images/ba4e09990a9fefadfbbca6f95ca68871-.2e16d0ba.fill-1440x605.jpg",

        preview: true
      },
      {
        spotId: 12,
        url: "https://cdn.homedit.com/wp-content/uploads/2021/11/Modern-Mansion.jpg",
        preview: true
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('SpotImages', null, {});
  }
};
