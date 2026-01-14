Ayúdame a crear un proyecto de software en nodejs versión 22.21.0
Estas son las especificaciones del caso:
La api debe ser REST, usar una arquitectura hexagonal o limpia.
Usar buenas prácticas de software, seguridad y principios SOLID.
Quiero usar Typescript, Express, mongus.
La persistencia será MongoDB. La autenticación la quiero controlar con
Google firebase auth.
La Api es para un comunidad llamada Restauración.
Se requiere administrar las personas que pertenecen a la entidad:
Los campos de la base de datos en Mongo (ya la tengo creada la base de datos en Mongo y se llama restauracion) son:
nombre, tipo_id, numero_id, email, celular, barrio, sexo, población (Jóven, adulto, niño),
estado_civil (soltero, casado), fecha_nacimiento, tipo_miembro (lider, asistente, invitado), bautizado (SI/NO), fecha_membresia,
ministerio (Se seleccionar de la tabla ministerios), estado (activo, inactivo), ocupación (estudiante, trabajador), foto (se adjunta la url de la foto de la persona)
Debe existir una administración para los ministerios, donde la la colección en mongo se llama ministerior y tiene los campos id, nombre_ministerio.
Por ahora hagamos paso por paso este proyecto a nivel de backend, una vez hagamos esta primera parte de los miembros, haremos los demás módulos del proyecto.
Debo tener un endpoint para consultar todos los miembros y también permitir filtrar por cualquier campo de la base de datos.
Los miembros se podrán crear, consultar, modificar y eliminar (sólo los perfiles admin del sistema podrán hacerlo), para lo cual se deben crear
los endpoint correspondiente. El sistema debe quedar con seguridad, por ejemplo JWT para consumir los endpoints u otras buenas prácticas de seguridad.
Si vez necesario cambiar los nombres de los campos de la base de datos por algo más recomendado lo podemos hacer.
Por ahora usaré Mongo, pero el sistema debe ser capaz de adaptarse a otra tecnología de base de datos que se cambie en el futuro (puertos y adaptadores).
Aclaro que ya ma ayudaste a crear la primera parte del proyecto y el crud de la entidad members ya está ok. Ahora ayúdame a crear lo siguiente dentro del mismo proyecto y con las mismas especificaciones:
Necesito crear un módulo llamado transactions y así se debe llamar la colección el mongo. Debe contener los siguientes campos:
numeroId (corresponde al numeroId del miembro, debe ser una clave foránera de la entidad members)
tipotrx (corresponde al tipo de transacción debe aceptar "INGRESO"/"EGRESO")
concepto (campo de texto)
valor (corresponde al valor numérico de la transacción)
fecha (corresponde a la fecha de la transacción)
fecha_creacion (corresponde a la fecha de de creación del registro en el sistema)
userId (corresponde al id del usuario que creó el registro en el sistema. Este campo debe estar relacionado con la entidad users, la cual crearemos más adelante)