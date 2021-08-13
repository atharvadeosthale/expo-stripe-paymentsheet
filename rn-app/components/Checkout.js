import { useStripe } from "@stripe/stripe-react-native";
import React, { useState } from "react";
import { View, Text, Button, TextInput, Alert } from "react-native";

const Checkout = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("0");
  const stripe = useStripe();

  const donate = async () => {
    try {
      const finalAmount = parseInt(amount);
      if (finalAmount < 1) return Alert.alert("You cannot donate below 1 INR");
      const response = await fetch("http://localhost:5000/donate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: finalAmount, name }),
      });

      const data = await response.json();
      if (!response.ok) {
        return Alert.alert(data.message);
      }
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: data.clientSecret,
      });
      if (initSheet.error) {
        console.error(initSheet.error);
        return Alert.alert(initSheet.error.message);
      }
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret: data.clientSecret,
      });
      if (presentSheet.error) {
        console.error(presentSheet.error);
        return Alert.alert(presentSheet.error.message);
      }
      Alert.alert("Donated successfully! Thank you for the donation.");
    } catch (err) {
      console.error(err);
      Alert.alert("Payment failed!");
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Name"
        style={{ padding: 10, borderColor: "black", borderWidth: 1 }}
        value={name}
        onChangeText={(e) => setName(e)}
      />
      <TextInput
        placeholder="Amount"
        keyboardType="numeric"
        style={{ padding: 10, borderColor: "black", borderWidth: 1 }}
        value={amount}
        onChangeText={(e) => setAmount(e)}
      />
      <Button title="Donate" onPress={donate} />
    </View>
  );
};

export default Checkout;
