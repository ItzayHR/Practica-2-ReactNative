import React, {useState} from 'react';
import {StyleSheet, Text, View,Button} from 'react-native';
import {SearchBar} from 'react-native-elements';

const HomeScreen = ({navigation}) => {
    const [lista,setLista]=useState([]);
    const [lugarTemp, setLugarTemp] = useState("");
    const [tempActual,setTempActual]=useState("")
    const [tempMax, setTempMax]= useState("");
    const [tempMin, setTempMin]= useState("");
    const [encontrado, setEncontrado] = useState(false);
    const [lat,setLat]=useState('');
    const [lon,setLon]=useState('');
    const titulo=lugarTemp.toUpperCase();

    async function buscar (city) {
        const key='e58b9a5ffd63c79ad3eb224e127a20b3';
        const api_url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`

        const json= await fetch(api_url)
        const resultado= await json.json()
        if(json.status!==200){
            console.log('No se encuentró la ciudad deseada')
            setEncontrado(false);
            setTempMax("");
            setTempMin("");
            setTempActual("");
            setLon("");
            setLat("");
        }else{
            try{
                setTempActual(resultado.main.feels_like);
                setTempMax(resultado.main.temp_max);
                setTempMin(resultado.main.temp_min);
                setLat(resultado.coord.lat);
                setLon(resultado.coord.lon); 
                setEncontrado(true);
  
            }catch(e){
                console.log(e);
                setEncontrado(false);
                setTempMax("");
                setTempMin("");
                setTempActual("");
                setLon("");
                setLat("");
            }
        }
    }

    return (
    <View style={styles.container}>

        <SearchBar
            round
            containerStyle={{
                backgroundColor:'transparent',
                borderTopWidth:0,
                borderBottomWidth:0,
            }}
            inputStyle={{backgroundColor:'white'}}
            onChangeText={(texto)=>{
                setLugarTemp(texto);
                buscar(texto);
            }}
            onClear={()=>{
                setLugarTemp("");
                setEncontrado(false);
            }}
            value={lugarTemp}
            placeholder="  Escribe aqui tu ciudad"
        />

        <View style={{margin:10, fontSize:20}}>
            {
                lugarTemp.length>0 
                ?
                    encontrado ?
                    <View style={[{ width: "100%", margin: 10, justifyContent:'center', alignItems:'center'}]}>
                        <Text style={styles.texto}>
                            Temperatura Actual: {tempActual}°C 
                            Temperatura Max: {tempMax}°C 
                            Temperatura Min: {tempMin}°C
                        </Text>
                        <Button
                        title="Mirar el clima de la semana"
                        onPress={() => navigation.navigate('DetailScreen',{lat,lon,titulo})}
                        />
                    </View>
                    :
                    <Text style={styles.texto}>
                        No se encuentró la ciudad :c
                    </Text>
                :
                <Text style={styles.texto}>
                    ↑ Busca una ciudad ↑
                </Text>
            }

        </View>

    </View>);
}
 
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
    },
    texto:{
      color: 'black', 
      textAlign: 'center', 
      fontSize: 20,
      margin: 10,
      fontWeight: 'bold',
    }
});