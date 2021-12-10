import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Card } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

const DetailScreen = ({route}) => {
    const [datos,setDatos]=useState([]);
    const [datosCargados,setDatosCargados]=useState(false);
    const {lat,lon} = route.params;

    useEffect(()=>{
        const key ="e58b9a5ffd63c79ad3eb224e127a20b3";
        const api_url=`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=${key}&units=metric`;
        fetch(api_url)
            .then(data => {
                return data.json()
            }).then(resultado=> {
                setDatos(resultado);
                setDatosCargados(true);
            }).catch(error=>{
                console.log(error);
                setDatosCargados(false);
            });

    },[])
    const createDate=(dt,i)=> {
        if(i===0){
            return "Hoy";
        }
        else{
        var day = new Date(dt * 1000);
        return day.toLocaleString("es-mx", { weekday: "long" }).toUpperCase(); 
        }
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                {datosCargados ?
                datos.daily.map((e,i)=>{
                    return(
                        <Card  
                        containerStyle={{
                            width: '100%'
                        }} 
                        key={i}>
                            <Card.Title>{createDate(e.dt,i)}</Card.Title> 
                            <Card.Divider/>
                            <View>
                                <Text>Temperatura Promedio: {e.temp.day}°C</Text>
                                <Text>Temperatura Mínima: {e.temp.min}°C</Text>
                                <Text>Temperatura Máxima: {e.temp.max}°C</Text>
                            </View>
                        </Card>
                    );
                })
                :
                <Text style={styles.texto2}>Espera unos momentos...</Text>
                }
            </ScrollView>
        </View>
      );
}
 
export default DetailScreen;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#CCC',
    },
    images:{
      width: 200, 
      height: 300,
      margin:5,
      alignSelf:'center'
    },
    texto:{
      color: 'black', 
      textAlign: 'center', 
      fontSize: 20,
      margin: 10,
      fontWeight: 'bold',
    },
    texto2:{
        color: 'black', 
        textAlign: 'center', 
        fontSize: 28,
        margin: 10,
    }
  });