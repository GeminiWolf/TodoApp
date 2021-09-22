import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { setDateFormat, moment, setTimeFormat } from '../Utils/Dates';
import { addTask } from '../Utils/TaskActions';
import { AuthContext } from '../Providers/AuthProvider';
import { color3 } from '../Styles/StyleValues';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const AddTaskScreen = ({ navigation, route }) => {

    const { load } = useContext(AuthContext)

    const [inputTitle, setInputTitle] = useState('');
    const [show, setShow] = useState(false);
    const [pickMode, setPickMode] = useState('date')
    const [date, setDate] = useState(moment.now());
    
    useEffect(() => {
        return () => setDate(moment.now())
    }, [])
    
    const [dateTask, setDateTask] = useState(date);
    const [EndDate, setEndDate] = useState(moment(date).add(30, 'minutes'));
    const [InputDescription, setInputDescription] = useState('');
    const [startEnd, setStartEnd] = useState('start');
    const [tempDate, setTempDate] = useState(dateTask);


    const syncDates = async (cur) => {            
        if(moment(dateTask).add(30, 'minutes') >= EndDate){
            setEndDate(moment(dateTask).add(30, 'minutes').valueOf())
        }
    }

    const addProcess = async () => {
        await addTask(inputTitle, InputDescription, dateTask, EndDate)
        load()
        navigation.goBack();
    }

    const setDateTime = (event) => {
        const currentDate = moment(event).valueOf();

        console.log('---------------\nold', dateTask)
        
        if(startEnd === 'start'){
            setDateTask(currentDate)
            setEndDate(moment(currentDate).add(30, 'minutes'))
        }
        else{
            currentDate <= dateTask && setEndDate(currentDate)
        }
        
        console.log('curr', currentDate)
        console.log('new task', dateTask)

        setShow(false)
    }

    const selectStartDate = () => {
        setStartEnd('start')
        setPickMode('date')
        setTempDate(dateTask)
        setShow(true)
    }
    
    const selectStartTime = () => {
        setStartEnd('start')
        setPickMode('time')
        setTempDate(dateTask)
        setShow(true)
    }
    
    const selectEndTime = () => {
        setStartEnd('end')
        setPickMode('time')
        setTempDate(EndDate)
        setShow(true)
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : "height"} style={{flex: 1, backgroundColor: '#acacac'}}>
            <View style={{ paddingHorizontal: (screenWidth*0.20)/2, flex: 1, paddingTop:(screenWidth*0.20)/2 }}>
                <Text style={styles.intputLabels} >Title</Text>
                <TextInput 
                    placeholder='Type here...' 
                    style={styles.topInputs} 
                    placeholderTextColor={'#bfbfbf'} 
                    onChangeText={(t) => setInputTitle(t)}
                />
                <Text style={styles.intputLabels} >Date</Text>
                <Text onPress={() => selectStartDate()} style={styles.topInputs}>{setDateFormat(dateTask)}</Text>
            </View>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : "height"} style={styles.detailSheet}>
                <View style={styles.timeInputsContainer}>
                    <View style={{borderBottomColor: '#000', borderBottomWidth: 1, width: '49%'}}>
                        <Text style={styles.intputLabels}>Start Time</Text>
                        <Text onPress={() => selectStartTime()} style={styles.timeInputs} >{setTimeFormat(dateTask)}</Text>
                    </View>
                    <View style={{borderBottomColor: '#000', borderBottomWidth: 1, width: '49%'}}>
                        <Text style={styles.intputLabels}>End Time</Text>
                        <Text onPress={() => selectEndTime()} style={styles.timeInputs} >{setTimeFormat(EndDate)}</Text>
                    </View>
                </View>
                <TextInput 
                    multiline={true} 
                    placeholderTextColor='#bfbfbf' 
                    placeholder='Enter your descrption...' 
                    numberOfLines={3} 
                    style={styles.descriptionInput}
                    onChangeText={(t)=> setInputDescription(t)}/>
                
                <View style={{width: '100%', marginBottom: (screenWidth*0.20)/2}}>
                    <Text style={{marginBottom: 10}} >Categories</Text>
                    <View style={{width: '100%'}}>
                        <View >
                            <Text style={{padding: 15, backgroundColor: '#adadad', alignSelf: 'flex-start', borderRadius: 20}} >Urgent</Text>
                        </View>
                    </View>
                </View>
                <Button 
                    title='Create Task'
                    onPress={() => addProcess()}
                    containerStyle={{
                        width: '100%', 
                        borderRadius: 30, 
                        marginBottom: (screenWidth*0.20)/2
                    }}
                    buttonStyle={{
                        height: 50,
                        backgroundColor: color3
                    }}/>
            </KeyboardAvoidingView>
            <DateTimePickerModal
                isVisible={show}
                mode={pickMode}
                is24Hour={true}
                date={new Date(tempDate)}
                onConfirm={setDateTime}
                onCancel={() => setShow(false)}
            />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    intputLabels: {
        fontSize: 14,
        color: '#000',
    },
    topInputs: {
        fontSize: 18,
        color: '#000',
        borderBottomColor: '#000', 
        borderBottomWidth: 1, 
        padding: 0,
        marginBottom: (screenWidth*0.20)/2
    },
    detailSheet: { 
        backgroundColor: '#f5f5f5', 
        display: 'flex', 
        paddingHorizontal: (screenWidth*0.20)/2, 
        paddingVertical: (screenWidth*0.20)/2, 
        alignItems: 'center',
        borderTopLeftRadius: (screenHeight*0.10)/2,
        borderTopRightRadius: (screenHeight*0.10)/2,
    },
    timeInputsContainer: { 
        width: '100%', 
        display: 'flex', 
        marginBottom: (screenWidth*0.20)/2, 
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    timeInputs: {
        fontSize: 18,
        color: '#000',
        borderBottomColor: '#000', 
        borderBottomWidth: 1, 
        padding: 0,
    },
    descriptionInput: {
        color: '#000',
        width: '100%', 
        maxHeight: 40,
        borderBottomColor: '#000', 
        borderBottomWidth: 1, 
        padding: 0,
        marginBottom: (screenWidth*0.20)/2
    }
})

export default AddTaskScreen;
