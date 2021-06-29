'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('users', [
      {
        id: '44a6619e-f6c3-423a-b669-a7831e7f4013',
        username: 'admin',
        password:
          'vyh2pMaKkwUct7W9sP1F+jgvPEUVqE4XR4qPskpAdV6o8o7Y+MmeYb3POmtv3Nlm/rkiFMOqjB5qQ81ivRnLrbEgzytv5bVe5EYs4rlwVTkqYjSxiVwLeJhWGb19Krc81acH2zb74Q24xowGZ8cF7wnLCWG5USkMWdCfWIBimT+NGCQdlHLf8OSWhhgRuzhuNwI8rsn7ZT1KWq70XpWgGOJKMl3DTe2wkCGNGLN+ttpQR3q0xrwYdWRSG2oom68cfCZtYzHqDSV4hlckHLl609ZODPcxjLQU10MH+h4SHM9awhVdTDFRS7yXDZ0U5N+q3AvwSHZIc8u8OTlczuD39w==',
        createdAt: new Date(),
        updatedAt: new Date(),
        roles: 'ADMIN',
      },
      {
        id: 'c6329dd1-b1af-44b8-b4d2-e94e25b8cfd4',
        username: 'user',
        password:
          'vyh2pMaKkwUct7W9sP1F+jgvPEUVqE4XR4qPskpAdV6o8o7Y+MmeYb3POmtv3Nlm/rkiFMOqjB5qQ81ivRnLrbEgzytv5bVe5EYs4rlwVTkqYjSxiVwLeJhWGb19Krc81acH2zb74Q24xowGZ8cF7wnLCWG5USkMWdCfWIBimT+NGCQdlHLf8OSWhhgRuzhuNwI8rsn7ZT1KWq70XpWgGOJKMl3DTe2wkCGNGLN+ttpQR3q0xrwYdWRSG2oom68cfCZtYzHqDSV4hlckHLl609ZODPcxjLQU10MH+h4SHM9awhVdTDFRS7yXDZ0U5N+q3AvwSHZIc8u8OTlczuD39w==',
        createdAt: new Date(),
        updatedAt: new Date(),
        roles: 'USER',
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('users', {
      [Op.or]: [
        { id: '44a6619e-f6c3-423a-b669-a7831e7f4013' },
        { id: 'c6329dd1-b1af-44b8-b4d2-e94e25b8cfd4' },
      ],
    });
  },
};
