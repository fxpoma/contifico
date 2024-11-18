# Contifico API Module

Este módulo proporciona una forma sencilla de interactuar con la API de Contífico, basada en los endpoints disponibles en la documentación oficial de Contífico: [https://contifico.github.io/](https://contifico.github.io/). Actualmente, se enfoca en la gestión de productos y documentos, permitiendo realizar consultas a la API para obtener información relacionada con estos recursos, entre otros.

## Instalación

Primero, instala el módulo desde npm:

```bash
npm install contifico
```

## Uso

### 1. **Configuración**

Para comenzar a usar el módulo, importa el paquete y configura la API con tus credenciales. Asegúrate de obtener las variables de entorno `API_KEY` y `API_TOKEN` a través del soporte de la empresa Contífico, ya que estos datos son necesarios para autenticarte en la API.

```javascript
import Contifico from "contifico";

const api = new Contifico({
  apiKey: process.env.API_KEY,
  apiToken: process.env.API_TOKEN,
});
```

### 2. **Métodos disponibles**

#### **api.documents.get()**

Obtiene una lista de documentos según los parámetros proporcionados.

```javascript
const documents = await api.documents.get({ filtro: "Factura" });
console.log(documents);
```

#### **api.documents.getOne()**

Obtiene un único documento según los parámetros proporcionados. Es útil cuando se necesita un solo resultado.

```javascript
const document = await api.documents.getOne({ filtro: "Factura001" });
console.log(document);
```

#### **api.products.get()**

Obtiene una lista de productos según los parámetros proporcionados.

```javascript
const products = await api.products.get({ categoria_id: "12345" });
console.log(products);
```

#### **api.products.getOne()**

Obtiene un solo producto según los parámetros proporcionados.

```javascript
const product = await api.products.getOne({ codigo: "PROD123" });
console.log(product);
```

## Variables de Entorno

Asegúrate de tener las siguientes variables de entorno configuradas:

- `API_KEY`: Tu clave de API proporcionada por Contífico.
- `API_TOKEN`: Tu token de API proporcionado por Contífico.

## Proyecto Independiente

Este módulo es un proyecto independiente que he desarrollado para facilitar la interacción con la API de Contífico. No está asociado oficialmente con la empresa Contífico, y se ha creado con fines educativos y para ofrecer una herramienta útil a la comunidad de desarrolladores que trabajan con esta API.

### Contacto

Si tienes sugerencias, preguntas o deseas contribuir al proyecto, no dudes en contactarme:

- **Correo electrónico**: personal@fxpoma.me
- **GitHub**: [fxpoma](https://github.com/fxpoma)
- **LinkedIn**: [fxpoma](https://www.linkedin.com/in/fxpoma/)

## Contribuciones

Este proyecto está abierto a cambios, mejoras y contribuciones por parte de la comunidad. Si tienes alguna sugerencia, deseas agregar nuevas funcionalidades o mejorar la documentación, siéntete libre de abrir un _issue_ o enviar un _pull request_. ¡Cualquier contribución es bienvenida!

### Cómo Contribuir

1. **Forkea** el repositorio en GitHub.
2. Crea una nueva rama para tu contribución (`git checkout -b feature/mi-nueva-funcionalidad`).
3. Realiza los cambios o mejoras y haz commits en tu rama.
4. **Push** los cambios a tu fork.
5. Abre un _pull request_ describiendo los cambios propuestos.

## Agradecimientos

Quiero agradecer a la comunidad de desarrolladores y a la empresa Contífico por ofrecer una API robusta y útil que me ha permitido crear este módulo. ¡Gracias por tu apoyo y por contribuir a la mejora de este proyecto!

## Licencia

Este módulo está licenciado bajo la [MIT License](LICENSE).
