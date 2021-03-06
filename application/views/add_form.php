<style>
    .error{
        color: red;
    }
</style>
<aside class="content-wrapper">    
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>
            <?php echo $welcome->loadPo('Add Form') ?>
            <small><?php echo $welcome->loadPo('New Form') ?></small>
            </h1>
        <ol class="breadcrumb">
            <li><a href="<?php echo base_url(); ?>"><i class="fa fa-dashboard"></i><?php echo $welcome->loadPo('Dashboard') ?></a></li>
            <li><a href="<?php echo base_url() ?>role"><i class="fa fa-fw fa-minus-circle"></i><?php echo $welcome->loadPo('Form') ?></a></li>
            <li class="active"><?php echo $welcome->loadPo('Add Form') ?></li>
        </ol>
    </section>
    <!-- Main content -->
    <section class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        <h3 class="box-title"><?php echo $welcome->loadPo('New Form') ?></h3>                                    
                    </div><!-- /.box-header -->
                    <div class="box-body table-responsive">
                        <form action="" method="POST" id="registerId">
                         <div class="input-group"><label><?php echo $welcome->loadPo('Form Name') ?></label>
                            <input type="text" name="form_name" placeholder="<?php echo $welcome->loadPo('Form Name') ?>" class="form-control">
                            <p class="help-block">Example:- extra_fields</p>
                        </div><label for="name" generated="true" class="error"></label><br>
                        <div class="input-group"><label> <?php echo $welcome->loadPo('Status') ?></label> &nbsp;<input type="hidden" name="status" value="0" class="form-control">
                        <input type="checkbox" name="status" value="1"/>
                        </div><label for="name" generated="true" class="error"></label><br>
                        
                        
                        <input type="submit" name="submit"value="<?php echo $welcome->loadPo('Submit') ?>" class="btn btn-success">&nbsp;
                        <a class="btn btn-warning" href="<?php echo base_url() ?>dform"><i class="fa fa-fw fa-mail-reply"></i><?php echo $welcome->loadPo('Cancel') ?></a>
                        </form>
                    </div>
                </div><!-- /.box-body -->
            </div><!-- /.box -->
        </div><!-- /.box -->
    </section><!-- /.content -->
</aside>               

