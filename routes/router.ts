
import { Router, Request, Response } from 'express';

const router = Router();
// si exportamos router desde aqui como constante:
// export router = Router();
// En cualquier lugar donde se importe se debe hacer mediante desestructuración: import { router } from 
// Otra forma es como se hace abajo


// Archivo de API Rest
// No es obligatorio definir el tipo de req y res, sin embargo se recomienda hacerlo
// para que TypeScript habilite las ayudas y los errores al codificar.

router.get('/mensajes', ( req: Request, res: Response  ) => {

    res.json({
        ok: true,
        mensaje: 'Todo esta bien!!'
    });

});

router.post('/mensajes', ( req: Request, res: Response  ) => {

    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;

    res.json({
        ok: true,
        cuerpo,
        de
    });

});


router.post('/mensajes/:id', ( req: Request, res: Response  ) => {

    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;
    const id     = req.params.id;

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });

});


// De esta forma, el importador solo hace import router from '....'
// Sin embargo, si se exportan más tipos, es necesario hacerlo como objeto, y de esta forma
// importarlo debe hacerse mediante desestructuración: import { router } from 
export default router;


