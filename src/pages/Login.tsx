import {
  Box,
  Button,
  Flex,
  Form,
  FormItem,
  Grid,
  TextFieldInput,
} from "@aircall/tractor";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth()
  let navigate = useNavigate();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    auth.signin(username, password).then(() => {
      navigate("/");
    })
  };

  return (
    <>
      <Flex alignItems="center" justifyContent="center" height="100vh">
        <Box width="400px" mx="auto" my="auto" boxShadow={3} p="30px" borderRadius={20}>
          <Form onSubmit={onSubmit}>
            <Grid gridColumnGap={4} gridRowGap={5} gridTemplateColumns="1fr">
              <FormItem
                label="Email"
                name="email"
                helpText="Your email should be unique"
              >
                <TextFieldInput
                  placeholder="john.doe@example.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormItem>
              <FormItem label="Password" name="email">
                <TextFieldInput
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormItem>
              <FormItem>
                <Button type="submit" block>
                  Login
                </Button>
              </FormItem>
            </Grid>
          </Form>
        </Box>
      </Flex>
      ;
    </>
  );
}
