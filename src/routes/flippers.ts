import { Hono } from 'hono'
import Flipper from '../models/flipper';
import Marque from '../models/marque';
import { isValidObjectId } from 'mongoose';

const router = new Hono().basePath('/flippers');

router.get('/', async (c) => {
  try {
    const allFlippers = await Flipper.find({}).populate('marque');
    return c.json(allFlippers);
  } catch (error: unknown) {
    return c.json({ message: (error as Error).message }, 500);
  }
});

router.get('/:flipperId', async (c) => {
  const flipperId = c.req.param('flipperId');

  if (!isValidObjectId(flipperId)) {
    return c.json({ msg: 'Invalid ObjectId' }, 400);
  }

  try {
    const flipper = await Flipper.findById(flipperId).populate('marque');

    if (!flipper) {
      return c.json({ msg: 'Flipper not found' }, 404);
    }
    return c.json(flipper);
  } catch (err: any) {
    return c.json({ message: err.message }, 500);
  }
});

router.post('/', async (c) => {
  const body = await c.req.json();
  
  if (!isValidObjectId(body.marque)) {
    return c.json({ message: 'Invalid marque ID' }, 400);
  }
  
  // verifier la marque
  const marqueExists = await Marque.findById(body.marque);
  if (!marqueExists) {
    return c.json({ message: 'Marque not found' }, 404);
  }

  try {
    const newFlipper = new Flipper(body);
    const savedFlipper = await newFlipper.save();
    return c.json(savedFlipper, 201);
  } catch (error: unknown) {
    return c.json({ message: (error as Error).message }, 400);
  }
});

router.put('/:flipperId', async (c) => {
  const flipperId = c.req.param('flipperId');
  const body = await c.req.json();

  if (!isValidObjectId(flipperId)) {
    return c.json({ msg: 'Invalid ObjectId' }, 400);
  }

  try {
    const updatedFlipper = await Flipper.findByIdAndUpdate(flipperId, body, { new: true });
    if (!updatedFlipper) {
      return c.json({ msg: 'Flipper not found' }, 404);
    }
    return c.json(updatedFlipper);
  } catch (err: any) {
    return c.json({ message: err.message }, 400);
  }
});

router.patch('/:flipperId', async (c) => {
  const flipperId = c.req.param('flipperId');
  const body = await c.req.json();

  if (!isValidObjectId(flipperId)) {
    return c.json({ msg: 'Invalid ObjectId' }, 400);
  }

  try {
    const { categories, ...rest } = body;
    const updatedFlipper = await Flipper.findByIdAndUpdate(
      flipperId,
      {
        $addToSet: { categories: categories },
        $set: { ...rest }
      },
      { new: true }
    );
    if (!updatedFlipper) {
      return c.json({ msg: 'Flipper not found' }, 404);
    }
    return c.json(updatedFlipper);
  } catch (err: any) {
    return c.json({ message: err.message }, 400);
  }
});

router.delete('/:flipperId', async (c) => {
  const flipperId = c.req.param('flipperId');

  if (!isValidObjectId(flipperId)) {
    return c.json({ msg: 'Invalid ObjectId' }, 400);
  }

  try {
    const deleteResult = await Flipper.deleteOne({ _id: flipperId });
    if (deleteResult.deletedCount === 0) {
      return c.json({ msg: 'Flipper not found' }, 404);
    }
    return c.json({ msg: 'Flipper deleted' });
  } catch (err: any) {
    return c.json({ message: err.message }, 500);
  }
});

export default router;
