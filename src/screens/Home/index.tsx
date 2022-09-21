import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logoImg from "../../assets/logo-nlw-esports.png";
import { Background } from "../../components/Background";
import { GameCard, GameCardProps } from "../../components/GameCard";
import { Heading } from "../../components/Heading";
import { styles } from "./styles";

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);

  const navigation = useNavigation();

  function handleOpenGame({ id, bannerUrl, title }: GameCardProps) {
    navigation.navigate("game", { id, bannerUrl, title });
  }

  useEffect(() => {
    fetch("http://192.168.15.8:3333/games")
      .then((response) => response.json())
      .then((data) => setGames(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentScrollView}>
          <Image style={styles.logo} source={logoImg} />
          <Heading title="Encontre seu duo!" subtitle="Selecione o game que deseja jogar..." />
          <FlatList
            data={games}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <GameCard data={item} onPress={() => handleOpenGame(item)} />}
            contentContainerStyle={styles.contentList}
          />
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
}
