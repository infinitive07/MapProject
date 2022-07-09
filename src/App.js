import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {
  MapContainer,
  TileLayer,
  Polygon,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { localdata } from './locality';
import './App.css';
import Population from './population';
import PieChartComponent from './PieChartComponent';
import { pincodeData } from './pincode';
import BarChartComponent from './BarChartComponent';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Button, Row, Col } from 'react-bootstrap';

const center = [12.975597, 77.509660999999994];

export default function App() {

  const [buttonText, setButtonText] = useState('Locality');
  const [value, setValue] = useState();
  const [mapData, setMapData] = useState(localdata);
  useEffect(() => {
    setValue(value)
  }, [value]);

  const onClickChangeMapData = () => {
    if (buttonText === 'Locality') {
      setButtonText('Pincode');
      setMapData(pincodeData)
    } else {
      setMapData(localdata)
      setButtonText('Locality')
    }
  }

  return (
    <>
      <Navbar style={{ backgroundColor: '#0088ff' }}>
        <Container >
          <Navbar.Brand className='font-weight-bold' style={{ color: 'white' }}>Report 
          
          {buttonText==='Pincode' && <h6 style={{ color: 'white',fontSize:'12px',marginTop:'2px' }}>{value && value.attributes.pincode != undefined ? `Individual pin code report for ${value.attributes.pincode}` : ''}</h6>}
          {buttonText==='Locality' && <h6 style={{ color: 'white',fontSize:'12px',marginTop:'2px' }}>{value && value.attributes.locality_i != undefined ? `Locality Id ${value.attributes.locality_i}` : ''}</h6>}
          
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Button variant="dark" onClick={() => onClickChangeMapData()}>{buttonText}</Button>{' '}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid={true}>
        <Row>
          <Col xs={6} style={{backgroundColor:'aliceblue'}}><Population value={value} buttonText={buttonText} /></Col>
          <Col xs={6} style={{paddingLeft:0}}> 
            <MapContainer
              center={center}
              zoom={12}
              style={{ width: '50vw', height: '50vh'}}
            >
              <TileLayer
                url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=jMb0anWPSMUFDo3alYLD"
                attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
              />
              {

                mapData.features.map((state) => {
                  const coordinates = state.geometry.rings[0].map((item) => [item[1], item[0]]);
                  return (
                    <Polygon
                      pathOptions={{
                        fillColor: '#96b6d2',
                        fillOpacity: 0.7,
                        weight: 0.5,
                        opacity: 1,
                        dashArray: 0,
                        color: 'Blue'
                      }}
                      positions={coordinates}
                      eventHandlers={{
                        mouseover: (e) => {
                          setValue(state)
                          const layer = e.target;
                          const population = buttonText == 'Locality' ? state.attributes.locality : state.attributes.pincode;
                          layer.bindPopup('<table style="border: 1px solid black; border-collapse: collapse;" >' +
                            '<tr style="border: 1px solid black; border-collapse: collapse; padding: 3px;"  >' +
                            '<td style="border: 1px solid black; border-collapse: collapse; padding: 3px;"  >' + buttonText + '</td>' +
                            '<td style="border: 1px solid black; border-collapse: collapse; padding: 3px;"  >Population</td>' +
                            '<td style="border: 1px solid black; border-collapse: collapse; padding: 3px;" >Households</td></tr>' +

                            '<tr style="border: 1px solid black; border-collapse: collapse; padding: 3px;" >' +
                            '<td style="border: 1px solid black; border-collapse: collapse; padding: 3px;" >' + population + '</td>' +
                            '<td style="border: 1px solid black; border-collapse: collapse; padding: 3px;" >' + state.attributes.population + '</td>' +
                            '<td style="border: 1px solid black; border-collapse: collapse; padding: 3px;" >' + state.attributes.households + '</td></tr>' + '<table>'
                          ).openPopup();
                          layer.setStyle({
                            dashArray: "0",
                            fillColor: "#96b6d2",
                            fillOpacity: 0.7,
                            weight: 0.5,
                            opacity: 1,
                            color: "Blue",
                          })
                        },
                        mouseout: (e) => {
                          const layer = e.target;
                          layer.closePopup();
                          layer.setStyle({
                            fillOpacity: 0.7,
                            weight: 0.5,
                            dashArray: "0",
                            color: 'Blue',
                            fillColor: '#96b6d2'
                          });
                        },
                      }}
                    />)

                })
              }

            </MapContainer>
          </Col>
          <Col xs={12}>
            <h1 class="font-weight-bold" style={{color:'#85c6ff'}}>Demographics</h1>
            <h1 class="font-weight-bold" style={{color:'#85c6ff',borderBottom:'1px solid',width:'200px',paddingTop:'7px'}}></h1>
          </Col>
          <Col xs={6}>
            <PieChartComponent value={value} />      
          </Col>
          <Col xs={6}>
            <BarChartComponent value={value} />
          </Col>
        </Row>
      </Container>

    </>
  );
}
