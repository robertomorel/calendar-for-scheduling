import React, { useCallback, useRef, ChangeEvent } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import { Form } from '@unform/web'

import Input from '../../components/Input'
import Button from '../../components/Button'

//import { useToast } from '../../hooks/toast'

import { Container, Content, AvatarInput } from './styles'

import getValidationErrors from '../../utils/getValidationErrors'

interface ProfileFormData {
  name: string
  email: string
  old_password: string
  password: string
  password_confirmation: string
}

export const ScheduleForm: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  //const { addToast } = useToast()
  const history = useHistory()

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({})
        // -- Criando um schema de validação. Usado quando queremos validar um objeto inteiro.
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório!'),
          email: Yup.string().required('Email obrigatório!').email('Digite um email válido!'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val: string | undefined) => !!val?.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val: string | undefined) => !!val?.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), null], 'Confirmação incorreta'),
        })

        await schema.validate(data, {
          abortEarly: false, // -- Para retornar todos os erros que ele encontrar, não de um por um.
        })

        const formData = {
          name: data.name,
          email: data.email,
          ...(data.old_password
            ? {
                old_password: data.old_password,
                password: data.password,
                password_confirmation: data.password_confirmation,
              }
            : {}),
        }

        //const response = await api.put('/profile', formData)
        //console.log(response)

        history.push('/dashboard')

        /*
        addToast({
          type: 'success',
          title: 'Perfil atualizado!',
          description: 'Suas informações foram atualizadas com sucesso.',
        })
        */
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)

          return
        }

        /*
        addToast({
          type: 'error',
          title: 'Erro na atualização!',
          description: 'Ocorreu um erro ao atualizar o perfil. Tente novamente!',
        })
        */
      }
    },
    [history],
  )

  const handleAvatarChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.files && e.target.files[0]);
    if (e.target.files) {
      const data = new FormData()
      data.append('avatar', e.target.files[0])
    }
  }, [])

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>

      <Content>
        <Form ref={formRef} initialData={{ name: 'teste', email: 'email' }} onSubmit={handleSubmit}>
          <AvatarInput>
            <label htmlFor="avatar">
              <FiCamera />

              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>

          <h1>Meu perfil</h1>

          <Input name="name" icon={FiUser} placeholder="Nome" />

          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Input
            containerStyle={{ marginTop: 24 }}
            name="old_password"
            icon={FiLock}
            type="password"
            placeholder="Senha atual"
          />

          <Input name="password" icon={FiLock} type="password" placeholder="Nova senha" />

          <Input name="password_confirmation" icon={FiLock} type="password" placeholder="Confirmar senha" />

          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  )
}
