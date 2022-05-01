# justissimo-frontend

## Docker

### Comando para criar container docker rodando node

```
docker run --rm -i --tty --volume $PWD:/app -p 3000:3000 -w /app node bash
```