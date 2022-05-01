import { StyleSheet } from "react-native";

import COLORS from '../const/color';

const styles = StyleSheet.create({
    inputContainer:{flexDirection:"row",marginTop:20},
    inputIcon:{marginTop:20,position:'absolute',},
    input:{color:COLORS.light,
            paddingLeft:30,
            borderBottomWidth:0.5,
            flex:1,
            fontSize:18},
    btnPrimary:{
        backgroundColor:COLORS.primary,
        height:50,
        marginTop:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
    },
    line:{
        height:1,
        width:30,
        backgroundColor:COLORS.light,
    },
    btnSecondary:{
        height:50,
        borderWidth:1,
        borderColor:COLORS.light,
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:5,
        flexDirection:"row",
    },
    btnImage:{
        width:20,
        height:20,
        marginLeft:5,
    },
    btnLogin:{
        width:350,
        height:45,
        borderRadius:6,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:COLORS.primary,
        marginTop:15,
        marginLeft:5
    },
    title:{
        fontSize:18,
        color:COLORS.white,
    },
    container:{
        backgroundColor:COLORS.grey,
        flex:1,
        flexDirection:'column'
        
    },
    logo:{
        width:130,
        height:130,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:130/2,
        marginLeft:140,
        marginTop:200
    },
    btnLogout:{
        width:350,
        height:45,
        borderRadius:6,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:COLORS.primary,
        marginTop:50,
        marginLeft:7
    }      
});

export default styles;