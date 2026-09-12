// src/models/cyber/constellationData.js - Cyber cat constellation topology nodes & links

const CYBER_CONSTELLATION_NODES = [
    { id: 'heart', relX: 0, relY: -15, size: 4.5, isHeart: true },
    { id: 'throat', relX: 0, relY: -45, size: 2.8 },
    { id: 'leftShoulder', relX: -26, relY: -22, size: 2.5 },
    { id: 'rightShoulder', relX: 26, relY: -22, size: 2.5 },
    { id: 'spineMid', relX: 0, relY: 15, size: 3.0 },
    { id: 'spineLow', relX: 0, relY: 45, size: 3.2 },
    { id: 'leftFlank', relX: -32, relY: 35, size: 2.5 },
    { id: 'rightFlank', relX: 32, relY: 35, size: 2.5 },
    { id: 'leftHip', relX: -42, relY: 72, size: 2.8 },
    { id: 'rightHip', relX: 42, relY: 72, size: 2.8 },
    { id: 'tailBase', relX: 0, relY: 78, size: 3.5 }
];

const CYBER_CONSTELLATION_LINKS = [
    ['throat', 'heart'],
    ['throat', 'leftShoulder'],
    ['throat', 'rightShoulder'],
    ['leftShoulder', 'heart'],
    ['rightShoulder', 'heart'],
    ['heart', 'spineMid'],
    ['spineMid', 'leftFlank'],
    ['spineMid', 'rightFlank'],
    ['leftFlank', 'leftHip'],
    ['rightFlank', 'rightHip'],
    ['spineMid', 'spineLow'],
    ['spineLow', 'tailBase'],
    ['leftHip', 'tailBase'],
    ['rightHip', 'tailBase']
];
