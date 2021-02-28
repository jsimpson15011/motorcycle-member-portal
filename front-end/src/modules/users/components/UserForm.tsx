import React, {useEffect} from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {getUser} from "../selectors";
import * as t from "../actions"
import {IUser} from "../model";
import {Box, Button, Checkbox, FormControlLabel, TextField} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {useFormik} from "formik";
import * as yup from "yup";
import generator from "generate-password"

const validationSchema = yup.object({
    userName: yup
        .string()
        .required('User name is Required'),
    email: yup
        .string()
        .email('Valid Email is Required')
        .required('Email is Required'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    isAdmin: yup
        .bool()
})


const UserForm = ({users, dispatch}: { users: { users: IUser[] }, dispatch: any }) => {
    useEffect(() => {
        dispatch(t.fetchUser())
    }, [dispatch])

    let history = useHistory();

    const formik = useFormik({
        initialValues: {
            userName: "",
            email: "",
            password: generator.generate({length: 10, numbers: true}),
            isAdmin: false
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                dispatch(t.updateUser({userName: values.userName, isAdmin: values.isAdmin, email: values.email}))
                history.push('/admin/users')
            } catch (e) {
                console.log(e.message)
            }
        }
    })

    if (!users.users) {
        return (
            <div>
                Loading
            </div>
        )
    }

    return (
        <Box p={2} maxWidth="100%" width={900} m="auto" bgcolor="#f7f7f7">
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    margin="normal"
                    id="userName"
                    name="userName"
                    label="User Name or Email"
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    error={formik.touched.userName && Boolean(formik.errors.userName)}
                    helperText={formik.touched.userName && formik.errors.userName}
                    fullWidth
                />
                <TextField
                    margin="normal"
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    fullWidth
                />
                <TextField
                    margin="normal"
                    id="password"
                    name="password"
                    label="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    fullWidth
                />
                <FormControlLabel control={
                    <Checkbox
                        id="isAdmin"
                        name="isAdmin"
                        value={formik.values.isAdmin}
                        onChange={formik.handleChange}
                    />
                } label="User is an admin"
                />

                <Button type="submit" variant="contained" color="primary">Add User</Button>
            </form>
        </Box>
    )
}

export default connect(
    createStructuredSelector({
        users: getUser
    })
)(UserForm)