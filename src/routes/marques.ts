import { Hono } from 'hono'
import Marque from '../models/marque';
import Flipper from '../models/flipper';

import { isValidObjectId } from 'mongoose';

const router = new Hono().basePath('/marques');

router.get('/', async (c) => {
  try {
    const allMarques = await Marque.find({}).populate('flippers');
    return c.json(allMarques);
  } catch (err: any) {
    return c.json({ message: err.message }, 500);
  }
});

router.get('/:marqueId', async (c) => {
  const marqueId = c.req.param('marqueId');

  if (!isValidObjectId(marqueId)) {
    return c.json({ msg: 'Invalid ObjectId' }, 400);
  }

  try {
    const marque = await Marque.findById(marqueId);
    if (!marque) {
      return c.json({ msg: 'Marque not found' }, 404);
    }
    return c.json(marque);
  } catch (err: any) {
    return c.json({ message: err.message }, 500);
  }
});

router.post('/', async (c) => {
  const body = await c.req.json();
  const { flippers } = body;

  if (flippers && flippers.length > 0) {
    for (const flipperId of flippers) {
      if (!isValidObjectId(flipperId)) {
        return c.json({ message: `Invalid flipper ID: ${flipperId}` }, 400);
      }
      const flipperExists = await Flipper.exists({ _id: flipperId });
      if (!flipperExists) {
        return c.json({ message: `Flipper not found: ${flipperId}` }, 404);
      }
    }
  }

  try {
    const newMarque = new Marque(body);
    const savedMarque = await newMarque.save();
    return c.json(savedMarque, 201);
  } catch (error: unknown) {
    return c.json({ message: (error as Error).message }, 400);
  }
});

router.put('/:marqueId', async (c) => {
  const marqueId = c.req.param('marqueId');
  const body = await c.req.json();

  if (!isValidObjectId(marqueId)) {
    return c.json({ msg: 'Invalid ObjectId' }, 400);
  }

  try {
    const updatedMarque = await Marque.findByIdAndUpdate(marqueId, body, { new: true });
    if (!updatedMarque) {
      return c.json({ msg: 'Marque not found' }, 404);
    }
    return c.json(updatedMarque);
  } catch (err: any) {
    return c.json({ message: err.message }, 400);
  }
});

router.patch('/:marqueId', async (c) => {
  const marqueId = c.req.param('marqueId');
  const body = await c.req.json();

  if (!isValidObjectId(marqueId)) {
    return c.json({ msg: 'Invalid ObjectId' }, 400);
  }

  try {
    const updatedMarque = await Marque.findByIdAndUpdate(
      marqueId,
      { $set: body },
      { new: true }
    );
    if (!updatedMarque) {
      return c.json({ msg: 'Marque not found' }, 404);
    }
    return c.json(updatedMarque);
  } catch (err: any) {
    return c.json({ message: err.message }, 400);
  }
});

router.delete('/:marqueId', async (c) => {
  const marqueId = c.req.param('marqueId');

  if (!isValidObjectId(marqueId)) {
    return c.json({ msg: 'Invalid ObjectId' }, 400);
  }

  try {
    const deleteResult = await Marque.deleteOne({ _id: marqueId });
    if (deleteResult.deletedCount === 0) {
      return c.json({ msg: 'Marque not found' }, 404);
    }
    return c.json({ msg: 'Marque deleted' });
  } catch (err: any) {
    return c.json({ message: err.message }, 500);
  }
});

export default router;
