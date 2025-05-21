import { SafeAreaView, StyleSheet, Text, View, StatusBar, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'
import Icons from './components/icons';
import Snackbar from 'react-native-snackbar'
import Icon from '@react-native-vector-icons/FontAwesome6'

export default function App() {
  const [isCross, setIsCross] = useState<boolean>(false)
  const [winner, setWinner] = useState<string>('')
  const [gameState, setGameState] = useState(new Array(9).fill('empty', 0, 9))

  const reloadGame = () =>{
    setIsCross(false)
    setWinner('')
    setGameState(new Array(9).fill('empty', 0, 9))
  }

  const checkIsWinner = () =>{
    if (
      gameState[0] === gameState[1] &&
      gameState[0] === gameState[2] &&
      gameState[0] !=='empty'
    ){
      setWinner(`${gameState[0]} won the game`)
    }
    else if(
      gameState[3] === gameState[4] &&
      gameState[4] === gameState[5] &&
      gameState[3] !=='empty'

    ){
      setWinner(`${gameState[3]} won the game`)
    }
    else if(
      gameState[6] === gameState[7] &&
      gameState[7] === gameState[8] &&
      gameState[6] !=='empty'

    ){
      setWinner(`${gameState[6]} won the game`)
    }
    else if(
      gameState[0] === gameState[3] &&
      gameState[3] === gameState[6] &&
      gameState[0] !=='empty'

    ){
      setWinner(`${gameState[0]} won the game`)
    }
    else if(
      gameState[1] === gameState[4] &&
      gameState[4] === gameState[7] &&
      gameState[1] !=='empty'

    ){
      setWinner(`${gameState[1]} won the game`)
    }
    else if(
      gameState[2] === gameState[4] &&
      gameState[4] === gameState[6] &&
      gameState[2] !=='empty'

    ){
      setWinner(`${gameState[0]} won the game`)
    }
    else if(
      !gameState.includes('empty', 0)
    ){
      setWinner("Draw game...")
    }

  }

  const onChangeItem = (itemNumber:number) =>{
    if (winner) {
      return Snackbar.show({
          text: winner, 
          backgroundColor: '#000000',
          textColor: "#FFFFFF"
      })
      
    }
    if (gameState[itemNumber]==='empty') {
      gameState[itemNumber] = isCross? 'cross': 'circle'
      setIsCross(!isCross)
    }
    else{
      return Snackbar.show({
        text:"Position is alright",
        backgroundColor:"red",
        textColor:"white"
      })
    }
    checkIsWinner()
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar/>
      {winner ? (
        <View style={[styles.playerInfo, styles.winnerInfo]}>
          <Text style={styles.winnerTxt}>
            {winner}
          </Text>
        </View>
      ):(
          <View style={[styles.playerInfo, isCross? styles.playerX:styles.playerO]}>
            <Text style={styles.gameTurnTxt}>
              Player {isCross ? 'X':'O'}'s turn 
            </Text>

          </View>
      )}
      <FlatList
      data={gameState}
      numColumns={3}
      style={styles.grid}
      renderItem={({item, index})=>(
        <Pressable key={index} style={styles.card} onPress={()=>onChangeItem(index)}>
          <Icons name={item}/>
          {/* <Text>X</Text> */}
        </Pressable>
      )}  
      />
      <Pressable style={styles.gameBtn}>
        <Text style={styles.gameBtnText}  onPress={reloadGame}>
          {winner? 'Start new game': 'reload the game'}
        </Text>
      </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: StatusBar.currentHeight,
  },
  playerInfo: {
    height: 60,
    marginHorizontal: 20,
    marginVertical: 16,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  gameTurnTxt: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  playerX: {
    backgroundColor: "#F44336", // red
  },
  playerO: {
    backgroundColor: "#4CAF50", // green
  },
  grid: {
    marginHorizontal: 12,
  },
  card: {
    height: 110,
    width: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(4px)',
    borderRadius: 12,
    margin: 1,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
  },
  winnerInfo: {
    borderRadius: 12,
    backgroundColor: "#FF9800", // orange
    marginHorizontal: 20,
    marginVertical: 10,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },
  winnerTxt: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFF",
    textTransform: "capitalize",
  },
  gameBtn: {
    marginHorizontal: 40,
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "linear-gradient(45deg, #7F00FF, #E100FF)", // fallback
    backgroundColor: "#6C63FF", // actual color
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 8,
  },
  gameBtnText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 1,
  },
});
