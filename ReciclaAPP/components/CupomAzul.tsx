import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Svg, {
  G,
  Path,
  Text,
  TSpan,
  Rect,
} from 'react-native-svg'

type CupomAzulProps = {
  color: string, 
  number: number, 
  serie: string
}

// Readonly<CupomAzulProps>
export default class CupomAzul extends PureComponent<CupomAzulProps> {
  render() {
    const { color = '#2a3e52', number, serie } = this.props
    return (
      <View style={styles.container}>
        <Svg width={266.11} height={125.341}>
          <G>
            <G>
              <Path                
                d="M2.913 104.512A2.955 2.955 0 0 0 0 101.558v-3.39a2.954 2.954 0 0 0 0-5.908v-3.39a2.954 2.954 0 0 0 0-5.908v-3.39a2.955 2.955 0 0 0 0-5.909v-3.388a2.955 2.955 0 0 0 0-5.91V60.98a2.954 2.954 0 0 0 0-5.907V51.68a2.955 2.955 0 0 0 0-5.909V42.38a2.954 2.954 0 0 0 0-5.907V33.08a2.954 2.954 0 0 0 0-5.908V23.78a2.954 2.954 0 0 0 0-5.908V13.82A13.821 13.821 0 0 0 13.819 0h238.472a13.82 13.82 0 0 0 13.819 13.82v4.06a2.954 2.954 0 0 0 0 5.908v3.39a2.954 2.954 0 0 0 0 5.908v3.39a2.954 2.954 0 0 0 0 5.907v3.39a2.955 2.955 0 0 0 0 5.909v3.39a2.954 2.954 0 0 0 0 5.907v3.39a2.955 2.955 0 0 0 0 5.91v3.388a2.955 2.955 0 0 0 0 5.909v3.39a2.954 2.954 0 0 0 0 5.908v3.39a2.954 2.954 0 0 0 0 5.908v3.39a2.954 2.954 0 0 0 0 5.908v3.41a13.82 13.82 0 0 0-13.819 13.82c0 .217.023.428.031.642H13.786c.011-.214.033-.425.033-.642A13.821 13.821 0 0 0 0 110.88v-3.413a2.954 2.954 0 0 0 2.913-2.955z"
                fill="#2a3e52"
              />
              <G fill="none" stroke="#a7a9ac" strokeMiterlimit={10}>
                <Path                  
                  d="M14.11 24.107v76.48l.417.252a27.916 27.916 0 0 1 9.7 9.956l.249.435h217.156l.25-.435a27.9 27.9 0 0 1 9.7-9.956l.414-.252V24.106l-.414-.252a28.113 28.113 0 0 1-9.33-9.328l-.252-.414H24.107l-.254.414a28.1 28.1 0 0 1-9.328 9.33z"
                />
                <Path data-name="Line 41" d="M195.275 14.752l.064 95.889" />
              </G>
            </G>
            <Text
              data-name="Cupom n\xFAmero:"
              transform="translate(43 40.834)"
              fill="#fff"
              fontSize="12"
              fontFamily="SFProDisplay-Medium, SF Pro Display"
              fontWeight="500"
            >
              <TSpan x={0} y={0}>
                {'Cupom n\xFAmero:'}
              </TSpan>
            </Text>
            <Text
              transform="translate(43 68.834)"
              fill="#fff"
              fontSize="20"
              fontFamily="SFProDisplay-Bold, SF Pro Display"
              fontWeight="700"
            >
              <TSpan x={0} y={0}>
                {number}
              </TSpan>
            </Text>
            <Text
              transform="translate(43 88.834)"
              fill="#fff"
              fontSize="12"
              fontFamily="SFProDisplay-Bold, SF Pro Display"
              fontWeight="700"
            >
              <TSpan x={0} y={0}>
                {`serie: ${serie}`}
              </TSpan>
            </Text>
            <G transform="rotate(-90 160.487 191.728)">
              <G>
                <G>
                  <G>
                    <Path
                      d="M275.244 251.758a.155.155 0 0 0-.157.092 1.918 1.918 0 0 1-3.367-.042 2.228 2.228 0 0 1-.175-1.555 1.958 1.958 0 0 1 .755-1.186 1.923 1.923 0 0 1 2.786.7.161.161 0 0 0 .17.107h2.31a4.242 4.242 0 1 0 .014 1.885h-.114c-.736.001-1.477.002-2.222-.001z"
                      fill="#fff"
                    />
                    <Path
                      d="M278.373 254.813h2.389v-8.039h-2.394z"
                      fill="#fff"
                    />
                    <Path                      
                      d="M278.373 245.708h2.389v-1.565h-2.394z"
                      fill="#fff"
                    />
                    <Path                      
                      d="M287.808 251.78c-.078 0-.1.041-.133.095a1.923 1.923 0 0 1-3.242.17 2.177 2.177 0 0 1-.331-1.613 1.976 1.976 0 0 1 .786-1.341 1.923 1.923 0 0 1 2.785.7.161.161 0 0 0 .17.107h2.317c-.011-.053-.016-.09-.025-.126a4.279 4.279 0 0 0-5.127-3.157 4.082 4.082 0 0 0-3.28 3.353c-.042.186-.056.379-.083.568v.521a1.046 1.046 0 0 1 .02.11 4.016 4.016 0 0 0 .626 1.906 4.346 4.346 0 0 0 7.814-1.021c.028-.085.049-.172.075-.264-.037 0-.059-.006-.081-.006-.764.001-1.528.002-2.291-.002z"
                      fill="#fff"
                    />
                    <Path                      
                      d="M300.096 247.655c-.092-.114-.162-.213-.243-.3a2.629 2.629 0 0 0-1.836-.823 3.789 3.789 0 0 0-3.69 1.925 4.53 4.53 0 0 0-.278 4.223 3.871 3.871 0 0 0 4.741 2.276 2.044 2.044 0 0 0 1.266-.942.21.21 0 0 0 .013-.043l.038.02v.85h2.4v-8.038h-2.41zm-2.027 5.215a2.054 2.054 0 0 1 .01-4.1 2.041 2.041 0 0 1 2.029 2.051 2.013 2.013 0 0 1-2.039 2.049z"
                      fill="#fff"
                    />
                    <Path                      
                      d="M290.897 244.102c-.1 0-.132.029-.132.132v10.606h2.4v-10.736h-.12c-.713 0-1.431.003-2.148-.002z"
                      fill="#fff"
                    />
                    <G>
                      <Path
                        d="M309.924 250.627a4.288 4.288 0 0 1 1.249-2.861 4 4 0 0 0-3.484-1.237 2.785 2.785 0 0 0-1.682.811.817.817 0 0 1-.068.052v-3.3c-.037 0-.059-.006-.081-.006h-2.233a.724.724 0 0 0-.1.014v10.725h2.32v-.865a.349.349 0 0 1 .046.044 2.086 2.086 0 0 0 1 .83 3.435 3.435 0 0 0 1.92.22 3.723 3.723 0 0 0 2.329-1.2 4.348 4.348 0 0 1-1.216-3.227zm-2.832 2.081a1.884 1.884 0 0 1-1.2-1.553 2.031 2.031 0 0 1 .5-1.767 1.965 1.965 0 0 1 3.237.491 2.144 2.144 0 0 1 .206.908 2.007 2.007 0 0 1-2.743 1.921z"
                        fill="#00bd9b"
                      />
                      <Path
                        d="M318.322 251.806h-2.211a.162.162 0 0 0-.166.1 1.917 1.917 0 0 1-3.367-.052 2.23 2.23 0 0 1-.171-1.555 1.96 1.96 0 0 1 .759-1.184 1.923 1.923 0 0 1 2.783.711.153.153 0 0 0 .162.1h2.313a4.235 4.235 0 0 0-4.263-3.381 4.186 4.186 0 0 0-2.989 1.227 3.885 3.885 0 0 1 .953 1.907 4.895 4.895 0 0 1-.482 3.468 4.038 4.038 0 0 1-.5.707 4.16 4.16 0 0 0 2.658 1.261 4.278 4.278 0 0 0 4.642-3.3z"
                        fill="#00bd9b"
                      />
                      <Path
                        d="M312.126 249.673a3.886 3.886 0 0 0-.953-1.907 4.287 4.287 0 0 0-1.249 2.861 4.348 4.348 0 0 0 1.22 3.221 4.04 4.04 0 0 0 .5-.707 4.9 4.9 0 0 0 .482-3.468z"
                        fill="#029b7e"
                      />
                    </G>
                  </G>
                </G>
              </G>
              <Rect
                width={15.258}
                height={1.777}
                rx={0.889}
                transform="translate(255.683 258.624)"
                fill="#ea4c35"
              />
              <Rect
                width={15.258}
                height={1.777}
                rx={0.889}
                transform="translate(271.668 258.624)"
                fill="#f59c00"
              />
              <Rect
                width={15.258}
                height={1.777}
                rx={0.889}
                transform="rotate(180 159.448 130.2)"
                fill="#00bd9b"
              />
              <Rect
                width={15.258}
                height={1.777}
                rx={0.889}
                transform="rotate(180 151.456 130.2)"
                fill="#2c96df"
              />
              <Path
                d="M257.9 257.9l-.03-.027v-.829h-2.248v8.037h2.4v-.127-2.188c0-.74-.006-1.481 0-2.222a1.144 1.144 0 0 1 .669-1.13 3.569 3.569 0 0 1 .727-.2 3.962 3.962 0 0 1 .494-.042v-2.412a1.971 1.971 0 0 0-2.012 1.14z"
                transform="translate(0 -10.268)"
                // fill="url(#prefix__a)"
                fill="#dd3f06"
              />
              <Path
                d="M285.977 257.364a4.106 4.106 0 0 0-4.046-1.313 3.749 3.749 0 0 0-1.695.822l-.161-.19-.155 1.878 1.878.155-.215-.254a1.451 1.451 0 0 1 .695-.412 2.04 2.04 0 0 1 1.634.237 1.668 1.668 0 0 1 .783 1.215h-5.914a.32.32 0 0 0-.049 0h-.032v.011c-.032.016-.048.048-.055.107a4.3 4.3 0 0 0-.036.7 4.041 4.041 0 0 0 1.1 2.956 4.106 4.106 0 0 0 4.046 1.313 3.748 3.748 0 0 0 1.695-.822l.161.19.154-1.878-1.878-.155.215.254a1.451 1.451 0 0 1-.695.412 2.04 2.04 0 0 1-1.634-.237 1.668 1.668 0 0 1-.783-1.215h5.914a.312.312 0 0 0 .049 0h.034v-.011c.032-.016.048-.048.055-.107a4.3 4.3 0 0 0 .036-.7 4.041 4.041 0 0 0-1.101-2.956z"
                transform="translate(-18.604 -9.608)"
                fill="#dd3f06"
                // fill="url(#prefix__b)"
              />
            </G>
          </G>
        </Svg>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 125.341,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    marginTop: 25,
  },
});
