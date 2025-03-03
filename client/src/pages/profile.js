import React, { useState } from "react";
import DefaultLayout from "../components/DefaultLayout.js";
import { Button, Form, message, Spin, Tabs } from "antd";
import PersonalInfo from "../components/PersonalInfo.js";
import SkillsEducation from "../components/SkillsEducation.js";
import ExperienceProjects from "../components/ExperienceProjects.js";
import axios from "axios";

const { TabPane } = Tabs;
function Profile() {
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user")).data;
  console.log(user)
  const onFinish = async (values) => {
    setLoading(true);
    try {
      // const temp = {...values, _id: user.data._id}
      console.log(values);
      const result = await axios.post("api/user/update", {
        ...values,
        _id: user._id
      });
      localStorage.setItem("user", JSON.stringify(result.data));
      setLoading(false);
      message.success("Profile updated successfully");
    } catch (error) {
      setLoading(false);
      message.error("Registration failed");
    }
  };
  return (
    <DefaultLayout>
      {loading && <Spin size="large" />}
      <div className="update-profile">
        <h4><b>Update Profile</b></h4>
        <hr />
        <Form layout="vertical" onFinish={onFinish} initialValues={user}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Personal Info" key="1">
              <PersonalInfo />
            </TabPane>
            <TabPane tab="Skills and Education" key="2">
              <SkillsEducation />
            </TabPane>
            <TabPane tab="Experience / Projects" key="3">
              <ExperienceProjects />
            </TabPane>
          </Tabs>

          <Button htmlType="submit">UPDATE</Button>
        </Form>
      </div>
    </DefaultLayout>
  );
}

export default Profile;
