import { Container, Grid, Paper, Typography } from '@mui/material';

function HomePage() {
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
              À propos de moi
            </Typography>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce posuere magna sit amet ex volutpat
              dignissim. Sed ac ex ac orci ultricies dignissim. Pellentesque habitant morbi tristique senectus et
              netus et malesuada fames ac turpis egestas. Vestibulum ante ipsum primis in faucibus orci luctus et
              ultrices posuere cubilia curae; Donec eget enim non arcu laoreet finibus.
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

export default HomePage;