import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from "@react-native-community/async-storage";

class ReferralOutMaternalNeonatalScreen extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    day: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
    month: [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember"
    ],
    colorStatus: ["#f05d5e", "#28c667", "#000000", "#00a6fb"],
    textStatus: ["Belum Diproses", "Diterima", "Ditolak", "Rujuk Balik"],
    referralType: 3,
    referralDirection: 1,
    activeStatus: 1,
    isActiveStatusOptionOpen: 0,
    spinner: false,
    referrals: [],
    search: ""
  };

  _setStatusReferralScreen() {
    let activeStatus = this.state.activeStatus - 1;

    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          height: 100 / 3 + "%"
        }}
      >
        <View
          style={{
            flexDirection: "row",
            backgroundColor: this.state.colorStatus[activeStatus],
            borderRadius: 4,
            alignItems: "center",
            justifyContent: "center",
            width: 100 + "%",
            height: 40 + "%"
          }}
        >
          <Text style={{ fontSize: 12, color: "#ffffff", fontWeight: "bold" }}>
            {this.state.textStatus[activeStatus]}
          </Text>
        </View>
      </View>
    );
  }

  _setActiveStatusOptionOpen() {
    if (this.state.isActiveStatusOptionOpen <= 0) {
      this.setState({ isActiveStatusOptionOpen: 1 });
    } else {
      this.setState({ isActiveStatusOptionOpen: 0 });
    }
  }

  _setArrowImageScreen() {
    let activeStatus = this.state.activeStatus - 1;

    return (
      <Icon
        name={
          "chevron-" + (this.state.isActiveStatusOptionOpen ? "up" : "down")
        }
        size={15}
        color={this.state.colorStatus[activeStatus]}
      />
    );
  }

  _setActiveStatusOptionScreen() {
    if (this.state.isActiveStatusOptionOpen >= 1) {
      return (
        <View style={{ flexDirection: "row", width: 100 + "%", height: 35 }}>
          {this._setStatusOptionScreen()}
        </View>
      );
    }
  }

  _setStatusOptionScreen() {
    let result = this.state.textStatus.map((text, index) => (
      <TouchableOpacity
        key={index + 1}
        onPress={() => this._setActiveStatus(index + 1)}
        activeOpacity={0.7}
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: this.state.colorStatus[index],
          width: 25 + "%",
          height: 100 + "%"
        }}
      >
        <Text style={{ color: "#ffffff", fontSize: 10, fontWeight: "bold" }}>
          {text}
        </Text>
      </TouchableOpacity>
    ));

    return result;
  }

  _setActiveStatus(newActiveStatus) {
    this.setState({
      activeStatus: newActiveStatus,
      isActiveStatusOptionOpen: 0
    });
  }

  _setActiveStatusScreen() {
    let activeStatus = this.state.activeStatus - 1;

    return (
      <Text
        style={{
          color: this.state.colorStatus[activeStatus],
          fontSize: 12,
          fontWeight: "bold"
        }}
      >
        {this.state.textStatus[activeStatus]}
      </Text>
    );
  }

  listener = null;

  componentDidMount() {
    this.listener = this.props.navigation.addListener("willFocus", () => {
      AsyncStorage.getItem("referralEmergencyIn").then(result =>
        this.setState({ referrals: JSON.parse(result) })
      );
    });
  }

  componentWillUnmount() {
    this.listener.remove();
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.firstLayer}>
        <Spinner
          animation={"slide"}
          visible={this.state.spinner}
          textContent={"Memuat Data Rujukan..."}
          textStyle={{ color: "#ffffff" }}
        />
        <StatusBar backgroundColor={"#00818c"} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#ffffff",
            width: 100 + "%",
            height: 45
          }}
        >
          <Image
            style={{ marginLeft: 5 + "%", width: 20, height: 20 }}
            source={require("../../../assets/images/magnifier.png")}
          />
          <TextInput
            onChangeText={search => this.setState({ search })}
            placeholder={"Cari Pasien atau Faskes"}
            placeholderTextColor={"#aeaeae"}
            style={{ marginLeft: 5 + "%", width: 45 + "%" }}
          />
          <View
            style={{ backgroundColor: "#aeaeae", width: 1, height: 60 + "%" }}
          ></View>
          <TouchableOpacity
            style={{ flexDirection: "row", width: 100 + "%" }}
            onPress={() => this._setActiveStatusOptionOpen()}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 30 + "%"
              }}
            >
              {this._setActiveStatusScreen()}
            </View>
            <View
              style={{
                justifyContent: "flex-end",
                alignItems: "center",
                right: 10 + "%"
              }}
            >
              {this._setArrowImageScreen()}
            </View>
          </TouchableOpacity>
        </View>

        {this._setActiveStatusOptionScreen()}

        <ScrollView style={{ marginTop: 5 + "%" }}>
          <TouchableOpacity
            onPress={() => {
              this.setState({ isActiveStatusOptionOpen: 0 });
              navigate("MaternalReferralDetailScreen", {
                //referral: referral,
                activeStatus: this.state.activeStatus,
                referralDirection: this.state.referralDirection,
                referralType: this.state.referralType
              });
            }}
            activeOpacity={0.7}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#ffffff",
              width: 100 + "%",
              height: 140
            }}
          >
            <View style={{ flexDirection: "column", marginLeft: 5 + "%" }}>
              {/* No Rujukan */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: 100 / 3 + "%"
                }}
              >
                <Text style={{ fontSize: 12, color: "#002e52" }}>
                  No. Rujukan:{" "}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#002e52",
                    fontWeight: "bold"
                  }}
                >
                  1
                </Text>
              </View>
              {/* Nama Pasien */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: 100 / 3 + "%"
                }}
              >
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require("../../../assets/images/injured.png")}
                />
                <Text
                  style={{
                    marginLeft: 7 + "%",
                    fontSize: 12,
                    fontWeight: "bold"
                  }}
                >
                  Maria Lestari
                </Text>
              </View>
              {/* Fasilitas Kesehatan */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: 100 / 3 + "%"
                }}
              >
                <Image
                  style={{ marginLeft: 3 + "%", width: 12, height: 12 }}
                  source={require("../../../assets/images/from.png")}
                />
                <Text
                  style={{
                    marginLeft: 9 + "%",
                    fontSize: 12,
                    fontWeight: "bold"
                  }}
                >
                  Puskesmas Pondok Benda
                </Text>
              </View>
            </View>

            <View
              style={{
                position: "absolute",
                flexDirection: "column",
                height: 100 + "%",
                right: 5 + "%"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "flex-end",
                  alignItems: "center",
                  height: 100 / 3 + "%"
                }}
              >
                <Text style={{ fontSize: 12, color: "#000000" }}>
                  Kamis, 5 Desember 2019
                </Text>
              </View>
              {this._setStatusReferralScreen()}
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "flex-end",
                  alignItems: "center",
                  height: 100 / 3 + "%"
                }}
              >
                <Text style={{ fontSize: 12, color: "#c4c4c4" }}>ICU</Text>
              </View>
            </View>
          </TouchableOpacity>
          <View
            style={{ backgroundColor: "#eeeeee", width: 100 + "%", height: 1 }}
          />
          <TouchableOpacity
            onPress={() => {
              this.setState({ isActiveStatusOptionOpen: 0 });
              navigate("NeonatalReferralDetailScreen", {
                //referral: referral,
                activeStatus: this.state.activeStatus,
                referralDirection: this.state.referralDirection,
                referralType: this.state.referralType
              });
            }}
            activeOpacity={0.7}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#ffffff",
              width: 100 + "%",
              height: 140
            }}
          >
            <View style={{ flexDirection: "column", marginLeft: 5 + "%" }}>
              {/* No Rujukan */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: 100 / 3 + "%"
                }}
              >
                <Text style={{ fontSize: 12, color: "#002e52" }}>
                  No. Rujukan:{" "}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#002e52",
                    fontWeight: "bold"
                  }}
                >
                  2
                </Text>
              </View>
              {/* Nama Pasien */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: 100 / 3 + "%"
                }}
              >
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require("../../../assets/images/injured.png")}
                />
                <Text
                  style={{
                    marginLeft: 7 + "%",
                    fontSize: 12,
                    fontWeight: "bold"
                  }}
                >
                  Indah Wijayanti
                </Text>
              </View>
              {/* Fasilitas Kesehatan */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: 100 / 3 + "%"
                }}
              >
                <Image
                  style={{ marginLeft: 3 + "%", width: 12, height: 12 }}
                  source={require("../../../assets/images/from.png")}
                />
                <Text
                  style={{
                    marginLeft: 9 + "%",
                    fontSize: 12,
                    fontWeight: "bold"
                  }}
                >
                  Puskesmas Pamulang
                </Text>
              </View>
            </View>

            <View
              style={{
                position: "absolute",
                flexDirection: "column",
                height: 100 + "%",
                right: 5 + "%"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "flex-end",
                  alignItems: "center",
                  height: 100 / 3 + "%"
                }}
              >
                <Text style={{ fontSize: 12, color: "#000000" }}>
                  Jumat, 6 Desember 2019
                </Text>
              </View>
              {this._setStatusReferralScreen()}
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "flex-end",
                  alignItems: "center",
                  height: 100 / 3 + "%"
                }}
              >
                <Text style={{ fontSize: 12, color: "#c4c4c4" }}>NICU</Text>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  firstLayer: {
    width: 100 + "%",
    height: 100 + "%",
    backgroundColor: "#f2f5f7"
  }
});

export default ReferralOutMaternalNeonatalScreen;
