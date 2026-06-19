import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, Card, CardContent, Typography } from "@mui/material";

function App() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://iot-backend.xo.je/get_data.php");
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const latest = data[0] || {};

  return (
    <Container style={{ marginTop: "40px" }}>
      <Typography variant="h4" align="center" gutterBottom>
         IoT Temperature & Humidity Dashboard
      </Typography>

      <Grid container spacing={3} justifyContent="center">

        {/* Temperature Card */}
        <Grid item xs={12} md={5}>
          <Card style={{ background: "#ffebee" }}>
            <CardContent>
              <Typography variant="h5">Temperature</Typography>
              <Typography variant="h3">
                {latest.temperature || "--"} °C
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Humidity Card */}
        <Grid item xs={12} md={5}>
          <Card style={{ background: "#e3f2fd" }}>
            <CardContent>
              <Typography variant="h5">Humidity</Typography>
              <Typography variant="h3">
                {latest.humidity || "--"} %
              </Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Container>
  );
}

export default App;