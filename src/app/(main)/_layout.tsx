import AppTabs from "@/components/app-tabs";
import Tabs from "expo-router/tabs";

export default function layout(props: any) {
  return (
    <Tabs>
      <Tabs.Screen name="index" />
    </Tabs>
  );
}
