import React from 'react';
import { Dimensions, Modal, View } from 'react-native';

const BottomSheet = () => {
    return (
        <Modal
                visible={true}
                transparent={true}
                animationType='fade'
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
                        <View
                            style={{
                                backgroundColor: '#adadad',
                                alignSelf: 'center',
                                marginTop: 10,
                                width: 70,
                                height: 5,
                                borderRadius: 5
                            }}
                        ></View>
                    </View>
                </View>
            </Modal>
    );
}

export default BottomSheet;
