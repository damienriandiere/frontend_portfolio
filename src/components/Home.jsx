import { Container, Grid, Paper, Typography, Button } from '@mui/material';

export default function Home() {
  const url_backend = import.meta.env.VITE_URL_BACKEND;

  const handleSwaggerPage = () => {
    window.location.href = `${url_backend}/api/api-docs`;
  }

  return (
    <Container maxWidth="lg" style={{ marginTop: '70px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h3" align="center" gutterBottom>
            Bienvenue sur mon portfolio
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h5" gutterBottom>
              Swagger for API
            </Typography>
            <Typography variant="body1">
              Si vous souhaitez voir la documentation de mon API, vous pouvez la consulter sur Swagger :
              <Button
            onClick={handleSwaggerPage}
            variant="contained"

          >
            SWAGGER
          </Button>
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h5" gutterBottom>
              Mes projets
            </Typography>
            <Typography variant="body1">
              Voici quelques-uns des projets sur lesquels j&apos;ai travaillé récemment.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
