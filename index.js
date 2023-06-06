const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

app.use(express.json());

app.get('/', async (req, res) => {
    const allUsers = await prisma.user.findMany();
    res.json(allUsers);
});

app.post('/', async (req, res) => {
    const newUser = await prisma.user.create({
        data: req.body
    });

    res.json(newUser);
});

app.put('/:id', async (req, res) => {
    const id = req.params.id;
    const updatedUser = await prisma.user.update({
        where: {
            id: parseInt(id)
        },
        data: req.body
    });

    res.json(updatedUser);
});

app.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const deletedUser = await prisma.user.delete({
        where: {
            id: parseInt(id)
        }
    });

    res.json(deletedUser);
});

app.post('/house', async (req, res) => {
    const newHouse = await prisma.house.create({
        data: req.body
    });

    res.json(newHouse);
});

app.get('/house', async (req, res) => {
    const allHouses = await prisma.house.findMany({
        include: {
            owner: true,
            buildBy: true
        }
    });

    res.json(allHouses);
});

app.get('/house/:id', async (req, res) => {
    const id = req.params.id;
    const getHouse = await prisma.house.findUnique({
        where: {
            id: id
        },
        include: {
            owner: true,
            buildBy: true
        }
    });

    res.json(getHouse);
});

app.get('/house/filter', async (req, res) => {
    const filteredHouses = await prisma.house.findMany({
        where: {
            wifiPassword: {
                not: null
            },
            owner: {
                age: {
                    gte: 22
                }
            }
        },
        orderBy: [
            {
                owner: {
                    firstName: "desc"
                }
            }
        ],
        include: {
            owner: true,
            buildBy: true
        }
    });

    res.json(filteredHouses);
});


app.listen(3000, () => {
    console.log('listening on port 3000');
});