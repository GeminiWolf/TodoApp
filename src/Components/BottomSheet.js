import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Button, Dimensions, Modal, View } from 'react-native';

const BottomSheet = ({visible, setVisible}) => {
    return (
        <Modal
                visible={visible}
                transparent={true}
                animationType='slide'

            >
                <View
                    style={{
                        flex:1,
                        justifyContent: 'flex-end',
                    }}
                >
                    <View
                        style={{
                            borderTopLeftRadius: 50,
                            borderTopRightRadius: 50,
                            backgroundColor: '#fff',
                            height: '50%',
                            width: Dimensions.get('window').width,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#adadad',
                                alignSelf: 'center',
                                marginTop: 10,
                                width: 70,
                                height: 5,
                                borderRadius: 5
                            }}
                            onPress={() => setVisible(false)}
                            
                        ></TouchableOpacity>
                    </View>
                </View>
            </Modal>
    );
}

export default BottomSheet;
