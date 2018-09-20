import React, { Component } from 'react';
import {
    Easing,
    StyleSheet,
    Text,
    View,
    Animated,
} from 'react-native';

import RNTesterButton from './RNTesterButton';

/**
 * 混合动画
 */
export default class CompositeExample extends Component {

    constructor(props) {
        super(props);
        this.anims = this.anims || [1, 2, 3].map(
            () => new Animated.Value(0)
        );
    }

    render() {

        return (
            <View style={styles.container}>
                <RNTesterButton onPress={() => {
                    var timing = Animated.timing;
                    Animated.sequence([ // One after the other
                        timing(this.anims[0], {
                            toValue: 200,
                            easing: Easing.linear,
                        }),
                        Animated.delay(400), // Use with sequence
                        timing(this.anims[0], {
                            toValue: 0,
                            easing: Easing.elastic(2), // Springy
                        }),
                        Animated.delay(400),
                        Animated.stagger(200,
                            this.anims.map((anim) => timing(
                                anim, { toValue: 200 }
                            )).concat(
                                this.anims.map((anim) => timing(
                                    anim, { toValue: 0 }
                                ))),
                        ),
                        Animated.delay(400),
                        Animated.parallel([
                            Easing.inOut(Easing.quad), // Symmetric
                            Easing.back(1.5),  // Goes backwards first
                            Easing.ease        // Default bezier
                        ].map((easing, ii) => (
                            timing(this.anims[ii], {
                                toValue: 320, easing, duration: 3000,
                            })
                        ))),
                        Animated.delay(400),
                        Animated.stagger(200,
                            this.anims.map((anim) => timing(anim, {
                                toValue: 0,
                                easing: Easing.bounce, // Like a ball
                                duration: 2000,
                            })),
                        ),
                    ]).start();
                }}>
                    Press to Animate
              </RNTesterButton>
                {['Composite', 'Easing', 'Animations!'].map(
                    (text, ii) => (
                        <Animated.View
                            key={text}
                            style={[styles.content, {
                                left: this.anims[ii]
                            }]}>
                            <Text style={styles.tv}>{text}</Text>
                        </Animated.View>
                    )
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        backgroundColor: 'deepskyblue',
        borderWidth: 1,
        borderColor: 'dodgerblue',
        padding: 20,
        margin: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    tv: {
        fontSize: 28,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
});