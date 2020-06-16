const express = require('express');
const cors = require('cors');

const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

const checkIfRepositoryExists = (request, response, next) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex((repo) => repo.id === id);

  if (repositoryIndex >= 0) {
    request.index = repositoryIndex;

    next();
  } else {
    return response
      .status(400)
      .json({ error: `Repository with ID ${id} not found.` });
  }
};

app.use('/repositories/:id', checkIfRepositoryExists);
app.use('/repositories/:id/like', checkIfRepositoryExists);

app.get('/repositories', (request, response) => {
  return response.json(repositories);
});

app.post('/repositories', (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put('/repositories/:id', (request, response) => {
  const { index } = request;
  const { title, url, techs } = request.body;

  const updatedRepository = {
    ...repositories[index],
    title,
    url,
    techs,
  };

  repositories[index] = updatedRepository;

  return response.json(updatedRepository);
});

app.delete('/repositories/:id', (request, response) => {
  const { index } = request;

  repositories.splice(index, 1);

  return response.status(204).send();
});

app.post('/repositories/:id/like', (request, response) => {
  const { index } = request;

  const repository = repositories[index];

  const updatedRepository = {
    ...repository,
    likes: repository.likes + 1,
  };

  repositories[index] = updatedRepository;

  return response.json(updatedRepository);
});

module.exports = app;
